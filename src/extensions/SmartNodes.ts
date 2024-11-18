import { TiptapExtension } from '../model/TiptapGroup'
import EditorNode from '../model/EditorNode'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        smartNodes: {
            cacheTitleAndNodes: () => ReturnType
            enableSmartNodesVerbose: () => ReturnType
            disableSmartNodesVerbose: () => ReturnType
        }
    }
}

export const SmartNodes = TiptapExtension.create({
    name: "smartNodes",

    priority: 1000,

    addStorage() {
        return {
            verbose: false,
            enabled: true,
            node: EditorNode.empty(),
            nodes: [] as EditorNode[],
            emoji: "👫 SmartNodes",
        }
    },

    onUpdate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onUpdate")
        }

        this.storage.node = EditorNode.fromEditor(this.editor)
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
            }
        }
    }
})