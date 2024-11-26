import { Extension } from '@tiptap/core'
import EditorNode from '../model/EditorNode'
import SmartHeading from './SmartHeading'
import UUIDError from '../error/UUIDError'
import Article from './Article'
import { priorityOfNodeStore } from '../model/TiptapGroup'
import { CharacterCountStorage } from '@tiptap/extension-character-count'
export interface NodeStoreStorage {
    verbose: boolean,
    title: string,
    article: EditorNode,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        nodeStore: {
            enableNodeStoreVerbose: () => ReturnType
            disableNodeStoreVerbose: () => ReturnType
            toggleToc: () => ReturnType
            addToc: () => ReturnType
            removeToc: () => ReturnType
            bootToc: () => ReturnType
            createArticle: (title: string) => ReturnType
            updateNodeStoreStorage: (stage: string) => ReturnType
            bootNodeStore: () => ReturnType
        }
    }
}

const NodeStore = Extension.create<{}, NodeStoreStorage>({
    name: 'nodeStore',

    group: 'block',

    priority: priorityOfNodeStore,

    addStorage() {
        return {
            verbose: false,
            title: "🗄️ NodeStore",
            article: EditorNode.empty(),
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: [SmartHeading.name],
                attributes: {
                    id: {
                        default: "0",
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            enableNodeStoreVerbose: () => () => {
                this.storage.verbose = true
                return true
            },

            disableNodeStoreVerbose: () => () => {
                this.storage.verbose = false
                return true
            },

            updateNodeStoreStorage: (stage: string) => ({ commands, editor }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.title, "updateNodeStoreStorage", stage)
                }

                const characterCount = editor.storage.characterCount as CharacterCountStorage

                // Update article
                let doc = EditorNode.fromEditor(this.editor)
                this.storage.article = doc.children?.find(node => node.type == Article.name) ?? EditorNode.empty()
                this.storage.article.setHTML(this.editor.getHTML())
                this.storage.article.setWordCount(characterCount.words())
                this.storage.article.setCharacterCount(characterCount.characters())

                try {
                    this.storage.article.flattened()
                } catch (error: unknown) {
                    if (error instanceof UUIDError) {
                        commands.showAlert(error.message, {
                            error: error,
                            type: error.block.type,
                            attrs: error.block.attrs,
                            title: error.block.title,
                            stage: stage,
                        })
                    }

                    return false
                }

                return true
            },

            bootNodeStore: () => ({ commands }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.title, "bootNodeStore")
                }

                commands.updateNodeStoreStorage("NodeStore:bootNodeStore")

                if (this.storage.verbose) {
                    console.log(this.storage.title, "bootNodeStore, article updated", this.storage.article.attrs?.toc)
                }

                return true
            }
        }
    },

    onCreate() {
    },

    onUpdate() {
        if (this.storage.verbose) {
            console.log(this.storage.title, "onUpdate")
        }

        this.editor.commands.updateNodeStoreStorage("NodeStore:onUpdate")

        if (this.storage.verbose) {
            console.log(this.storage.title, "onUpdate, article updated")
        }

        if (this.storage.verbose) {
            console.log(this.storage.title, "onUpdate, article updated")
        }
    },
})

export default NodeStore
