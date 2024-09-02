import { defineStore } from 'pinia'
import TreeNode from '../model/TreeNode'
import EditorDoc from '../model/EditorDoc'
import Config from '../config/config'
import MarkdownHelper from '../helper/MarkdownHelper'
import Helper from '../helper/Helper'
import UpdateData from '../model/UpdateData'
import SmartMessage from '../model/SmartMessage'
import { error } from 'console'

const config = Config
const isDebug = config.isDebug
const title = "🍋 AppStore"

export const useAppStore = defineStore('node-store', {
    state: () => {
        return {
            isDebug: isDebug,
            message: new SmartMessage(""),
            node: TreeNode.makeDefaultNode(),
            contentLastUpdatedAt: Date.now(),
            drawLink: config.drawLink,
            monacoLink: config.monacoLink,
            loading: true,
            ready: false,
            selectionType: '',
            plugins: config.plugins
        }
    },

    actions: {
        setMessage(text: string) {
            this.message = new SmartMessage(title + ": " + text)
        },

        hideLoading() {
            this.loading = false
        },

        closeDraw: function () {
            let verbose = false;
            if (verbose) {
                console.log(title, 'close draw')
            }
            document.dispatchEvent(new CustomEvent('close-draw'))
        },

        getDrawLink(): string {
            return this.drawLink
        },

        setDrawLink: function (link: string) {
            this.drawLink = link
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

            this.loading = true
            this.node = node
            this.loading = false

            Helper.toTop()
        },

        setReady() {
            console.log(title, 'setReady')
            this.setMessage("setReady")

            this.ready = true
            this.plugins.forEach((plugin) => {
                plugin.onPageLoaded()
            })
        },

        updateSelectionType(type: string) {
            if (type == this.selectionType) return

            this.selectionType = type
            this.plugins.forEach((plugin) => {
                plugin.onSelectionTypeChange(type)
            })
        },
    },
})