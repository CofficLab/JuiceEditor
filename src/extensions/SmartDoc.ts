import { Document } from '@tiptap/extension-document'
import Root from './Root'
import EditorNode from '../model/EditorNode'

declare module '@tiptap/vue-3' {
    interface Commands<ReturnType> {
        smartDoc: {
            cacheTitleAndNodes: () => ReturnType
            enableSmartNodesVerbose: () => ReturnType
            disableSmartNodesVerbose: () => ReturnType
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
            enabled: true,
            node: EditorNode.empty(),
            nodes: [] as EditorNode[],
            emoji: "👫 Doc",
        }
    },

    onUpdate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onUpdate")
        }

        this.storage.node = this.storage.node.updateFromEditor(this.editor)
        this.storage.nodes = this.storage.node.flattened()

        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            this.editor.commands.webKitSendDebugMessage(this.storage.emoji + ' Update Title: ' + this.storage.title)
        }
    },

    addCommands() {
        return {
            /**
             * call this after 
             * - editor is mounted(means the host element is ready, not onCreate)
             * - editor content is ready
             */
            cacheTitleAndNodes: () => () => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, '🚩 cache title and nodes')
                }

                this.storage.node = EditorNode.fromEditor(this.editor)
                this.storage.nodes = this.storage.node.flattened()

                return true
            },

            enableSmartNodesVerbose: () => () => {
                this.storage.verbose = true
                return true
            },

            disableSmartNodesVerbose: () => () => {
                this.storage.verbose = false
                return true
            },

            setDoc: (node: EditorNode) => () => {
                this.storage.node = node
                this.storage.nodes = this.storage.node.flattened()
                this.editor.commands.setContent(node.html ?? "")
                this.editor.commands.webKitSendDebugMessage(this.storage.emoji + ' Set Node')

                return true
            },

            setDocContent: (content: string) => ({ commands }) => {
                commands.setContent(content, true)

                return true
            },

            setDocFromJSONString: (jsonString: string) => ({ commands }) => {
                this.storage.node = EditorNode.fromJSONString(jsonString)
                this.storage.nodes = this.storage.node.flattened()
                commands.setContent(this.storage.node.html ?? "")

                return true
            }
        }
    }
})

export default SmartDoc