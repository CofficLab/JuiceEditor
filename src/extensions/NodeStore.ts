import { Extension } from '@tiptap/core'
import EditorNode from '../model/EditorNode'
import SmartHeading from './SmartHeading'
import { EditorNodeNoUUIDError, EditorNodeNoParentIdError } from '../error/EditorNodeError'
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
            title: "🚘 NodeStore",
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
                    this.editor.commands.appendLog(this.storage.title, '🔄 updateNodeStoreStorage ' + stage)
                }

                const characterCount = editor.storage.characterCount as CharacterCountStorage

                // Update article
                try {
                    let doc = EditorNode.fromEditor(this.editor)
                    this.storage.article = doc.children?.find(node => node.type == Article.name) ?? EditorNode.empty()
                    this.storage.article.setHTML(this.editor.getHTML())
                    this.storage.article.setWordCount(characterCount.words())
                    this.storage.article.setCharacterCount(characterCount.characters())
                } catch (error: unknown) {
                    if (error instanceof EditorNodeNoUUIDError) {
                        commands.showAlert(error.message, {
                            error: error.message,
                            type: error.block.type,
                            attrs: error.block.attrs,
                            title: error.block.title,
                            stage: stage,
                        })
                    } else if (error instanceof EditorNodeNoParentIdError) {
                        commands.showAlert(error.message, {
                            error: error,
                            type: error.block.type,
                            attrs: error.block.attrs,
                            title: error.block.title,
                            stage: stage,
                        })
                    } else {
                        commands.showAlert("Error updating NodeStore", {
                            error: error,
                            stage: stage,
                        })
                    }

                    return false
                }

                return true
            },

            bootNodeStore: () => ({ commands }) => {
                if (this.storage.verbose) {
                    this.editor.commands.appendLog(this.storage.title, '🔄 bootNodeStore')
                }

                commands.updateNodeStoreStorage("NodeStore:bootNodeStore")

                if (this.storage.verbose) {
                    this.editor.commands.appendLog(this.storage.title, '🔄 bootNodeStore, article updated ' + this.storage.article.attrs?.toc)
                }

                return true
            }
        }
    },

    onCreate() {
    },

    onUpdate() {
        this.editor.commands.updateNodeStoreStorage("NodeStore:onUpdate")
    },
})

export default NodeStore
