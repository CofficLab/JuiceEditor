import { defineStore } from 'pinia'
import TreeNode from '../model/TreeNode'
import EditorDoc from '../model/EditorDoc'
import Config from '../config/config'
import MarkdownHelper from '../helper/MarkdownHelper'
import Helper from '../helper/Helper'
import UpdateData from '../model/UpdateData'

const config = Config
const isDebug = config.isDebug
const title = "🍋 AppStore"

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            isDebug: isDebug,
            node: TreeNode.makeDefaultNode(),
            docs: [EditorDoc.makeDefaultDoc()],
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

        getContent(): string {
            return this.getCurrentDoc().content
        },

        getJSON(): string {
            return JSON.stringify(this.getCurrentDoc().json)
        },

        getDrawLink(): string {
            return this.drawLink
        },

        getMarkdown(): string {
            return MarkdownHelper.html2markdown(this.getContent())
        },

        setDrawLink: function (link: string) {
            this.drawLink = link
        },

        setNode: function (node: TreeNode) {
            let verbose = true;

            this.loading = true

            if (verbose) {
                console.log(title, 'setNode')
            }

            this.loading = false
            this.node = node

            Helper.toTop()
        },

        setReady() {
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

        getCurrentDoc(): EditorDoc {
            let doc = this.docs.find((doc: EditorDoc) => {
                return doc.active
            })

            if (!doc) {
                throw new Error('no active doc')
            }

            return doc
        },

        getCurrentDocUUID(): string {
            return this.getCurrentDoc().uuid
        },

        setDocs(docs: EditorDoc[]) {
            let verbose = false;

            if (verbose) {
                console.log(title, 'setDocs', docs)
            }

            this.docs = docs
        },

        setDoc(doc: EditorDoc) {
            let verbose = false;

            if (this.getContent() == doc.content) {
                if (verbose) {
                    console.log(title, '更新节点，没变化，忽略')
                }
                return
            }

            if (verbose) {
                console.log(title, 'setDoc', doc)
            }

            this.docs = this.docs.map((element: EditorDoc) => {
                if (element.uuid == doc.uuid) {
                    return doc
                } else {
                    return element
                }
            })

            if (!this.docs.find((element: EditorDoc) => element.uuid == doc.uuid)) {
                console.log(title, '新增节点')
                this.docs.push(doc)
            }

            this.docs = this.docs.map((element: EditorDoc) => {
                if (element.uuid == doc.uuid) {
                    return doc.setActive(true)
                } else {
                    return element.setActive(false)
                }
            })

            this.plugins.forEach((plugin) => {
                plugin.onDocUpdated(doc)
            })

            this.plugins.forEach((plugin) => {
                plugin.onNodeUpdated(this.node)
            })

            this.plugins.forEach((plugin) => {
                plugin.onUpdated(UpdateData.fromNodeAndDoc(this.node, doc))
            })

            if (doc.content != this.getContent()) {
                throw new Error('content not match')
            }
        }
    },
})