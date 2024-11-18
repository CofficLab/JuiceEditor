import { Document } from '@tiptap/extension-document'
import Root from './Root'
import EditorNode from '../model/EditorNode'

declare module '@tiptap/vue-3' {
    interface Commands<ReturnType> {
        smartDoc: {
            enableDocVerbose: () => ReturnType
            disableDocVerbose: () => ReturnType
            setDoc: (node: EditorNode) => ReturnType
            setDocContent: (content: string) => ReturnType
            setDocFromJSONString: (jsonString: string) => ReturnType
        }
    }
}

const SmartDoc = Document.extend({
    content: Root.name,

    priority: 1000,

    addStorage() {
        return {
            verbose: false,
            doc: EditorNode.empty(),
            emoji: "🌳 Doc",
        }
    },

    onCreate() {
        this.storage.doc = EditorNode.fromEditor(this.editor)
    },

    onUpdate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onUpdate")
        }

        this.storage.doc = this.storage.doc.updateFromEditor(this.editor)
    },

    addCommands() {
        return {
            enableDocVerbose: () => () => {
                this.storage.verbose = true
                return true
            },

            disableDocVerbose: () => () => {
                this.storage.verbose = false
                return true
            },

            setDoc: (node: EditorNode) => ({ commands }) => {
                this.storage.doc = node

                commands.setContent(node.html ?? "")

                return true
            },

            setDocContent: (content: string) => ({ commands }) => {
                commands.setContent(content, true)

                return true
            },

            setDocFromJSONString: (jsonString: string) => ({ commands }) => {
                commands.setDoc(EditorNode.fromJSONString(jsonString))

                return true
            }
        }
    }
})

export default SmartDoc