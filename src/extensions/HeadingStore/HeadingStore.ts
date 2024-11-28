import TocHeading from "./TocHeading";
import { TiptapExtension, priorityOfHeadingStore } from "../../model/TiptapGroup";

export interface HeadingStoreStorage {
    title: string
    tree: TocHeading
    verbose: boolean
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        HeadingStore: {
            updateHeadings: () => ReturnType,
            enableHeadingStoreVerbose: () => ReturnType,
            disableHeadingStoreVerbose: () => ReturnType,
        }
    }
}

const HeadingStore = TiptapExtension.create<{}, HeadingStoreStorage>({
    name: 'headingStore',

    priority: priorityOfHeadingStore,

    addStorage() {
        return {
            title: "🦀 HeadingStore",
            tree: new TocHeading(),
            verbose: false,
        }
    },

    onCreate() {
        this.editor.commands.updateHeadings()
    },

    onUpdate() {
        if (this.storage.verbose) {
            this.editor.commands.appendLog(this.storage.title, '🔄 onUpdate, update heading tree')
        }

        this.editor.commands.updateHeadings()
    },

    addCommands() {
        return {
            updateHeadings: () => ({ tr, state, dispatch, commands }) => {
                var currentId = 0
                var title = this.storage.title
                this.storage.tree.children = []

                state.doc.descendants((node: any, pos: any) => {
                    if (['heading'].includes(node.type.name)) {
                        const id = `heading-${currentId++}`

                        if (node.attrs.id !== id) {
                            tr.setNodeMarkup(pos, undefined, { ...node.attrs, id })
                        }

                        try {
                            this.storage.tree.appendNode(new TocHeading()
                                .setId(id)
                                .setText(node.textContent)
                                .setLevel(node.attrs.level)
                            )
                        } catch (error: Error | unknown) {
                            if (error instanceof Error) {
                                console.error(error)
                                commands.showAlert(error.message, {
                                    stage: title + ' updateHeadings',
                                })
                            }
                            return false
                        }
                    }
                })

                tr.setMeta('addToHistory', false)
                tr.setMeta('preventUpdate', true)

                if (dispatch) {
                    dispatch(tr)
                }

                return true
            },

            enableHeadingStoreVerbose: () => () => {
                this.storage.verbose = true
                return true
            },

            disableHeadingStoreVerbose: () => () => {
                this.storage.verbose = false
                return true
            }
        }
    },
})

export default HeadingStore
