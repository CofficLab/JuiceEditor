import { defineStore } from 'pinia'
import TreeNode from '../model/TreeNode'
import Config from '../config/config'
import SmartMessage from '../model/SmartMessage'

const config = Config
const isDebug = config.isDebug
const title = "🌲 NodeStore"

export const useNodeStore = defineStore('node-store', {
    state: () => {
        return {
            message: new SmartMessage(""),
            node: TreeNode.makeDefaultNode(),
        }
    },

    actions: {
        setMessage(text: string) {
            this.message = new SmartMessage(title + ": " + text)
        },

        setNode: function (node: TreeNode) {
            let verbose = true;

            if (verbose) {
                console.log(title, 'setNode')
            }

            this.setMessage("setNode:" + JSON.stringify(node))

            if (node.uuid.length == 0) {
                throw new Error('node uuid is empty')
            }

            this.node = node
        },
    },
})

export type NodeStore = ReturnType<typeof useNodeStore>