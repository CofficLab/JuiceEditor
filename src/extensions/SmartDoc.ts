import { Document } from '@tiptap/extension-document'
import EditorNode from '../model/EditorNode'
import SmartHeading from './SmartHeading'

declare module '@tiptap/vue-3' {
    interface Commands<ReturnType> {
        smartDoc: {
            enableDocVerbose: () => ReturnType
            disableDocVerbose: () => ReturnType
            setDoc: (node: EditorNode) => ReturnType
            setDocContent: (content: string) => ReturnType
            setDocFromJSONString: (jsonString: string) => ReturnType
            setMounted: () => ReturnType
            setDocVerbose: (value: boolean) => ReturnType
        }
    }
}

const SmartDoc = Document.extend({
    content: `${SmartHeading.name} block*`,

    priority: 1000,

    addStorage() {
        return {
            verbose: false,
            doc: EditorNode.empty(),
            emoji: "🌳 Doc",
            mounted: false,
        }
    },

    onUpdate() {
        if (this.storage.verbose) {
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

            setDoc: (node: EditorNode) => ({ commands, tr, chain }) => {
                this.storage.doc = node

                return chain()
                    .setContent(node.html ?? "")
                    .run()
            },

            setDocContent: (content: string) => ({ commands }) => {
                return commands.setContent(content, true)
            },

            setDocFromJSONString: (jsonString: string) => ({ commands }) => {
                return commands.setDoc(EditorNode.fromJSONString(jsonString))
            },

            setMounted: () => ({ chain }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, '🖥️ setMounted')
                }

                this.storage.mounted = true
                this.storage.doc = EditorNode.fromEditor(this.editor)

                return chain()
                    .bootSlotListener()
                    .bootLocalStorage()
                    .bootWebKit()
                    .run()
            },

            setDocVerbose: (value: boolean) => () => {
                this.storage.verbose = value
                return true
            },
        }
    }
})

export default SmartDoc