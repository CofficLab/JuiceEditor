import { defineStore } from 'pinia'
import TreeNode from '../model/TreeNode'
import EditorDoc from '../model/EditorDoc'
import LocalDB from '../database/LocalDB'
import Config from '../config/config'
import MarkdownHelper from '../helper/MarkdownHelper'
import Helper from '../helper/Helper'
import UpdateData from '../model/UpdateData'

const config = Config
const isDebug = config.isDebug
const title = "🍋 AppStore"

function getDefaultTreeNode(): TreeNode {
    if (isDebug) {
        return LocalDB.getTreeNode()
    }

    return TreeNode.makeDefaultNode()
}

function getDefaultDocs(): EditorDoc[] {
    if (isDebug) {
        return LocalDB.getDocs() || [EditorDoc.makeDefaultDoc()]
    }

    return [EditorDoc.makeDefaultDoc()]
}

function getDefaultCurrentDocUUID(): string | undefined {
    if (isDebug) {
        return LocalDB.getCurrentDocUUID()
    }

    return undefined
}

export interface AppStore {
    isDebug: boolean
    node: TreeNode
    docs: EditorDoc[]
    currentDocUUID: string | undefined
    contentLastUpdatedAt: number
    drawLink: string
    monacoLink: string
    loading: boolean
    ready: boolean
    selectionType: string
    updateDoc: (doc: EditorDoc) => void
    setNode: (node: TreeNode) => void
    setTreeNodeAndDocs: (node: TreeNode, docs: EditorDoc[]) => void
}

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            isDebug: isDebug,
            node: getDefaultTreeNode(),
            docs: getDefaultDocs(),
            currentDocUUID: getDefaultCurrentDocUUID(),
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

        setCurrentNode: function (data: object) {
            let verbose = false;
            this.loading = true
            if (verbose) {
                console.log(title, 'setCurrentNode && close draw')
            }

            this.node = new TreeNode(data)

            document.dispatchEvent(new CustomEvent('close-draw'))

            this.loading = false

            Helper.toTop()
        },

        setNodeAndDocs: function (node: TreeNode, docs: EditorDoc[]) {
            let verbose = false;
            this.loading = true
            if (verbose) {
                console.log(title, 'setCurrentNodeAndDocs')
            }

            this.node = node
            this.docs = docs
            this.currentDocUUID = docs[0].uuid

            this.loading = false
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
            if (this.currentDocUUID) {
                return this.docs.find((doc) => doc.uuid == this.currentDocUUID)!
            }

            this.currentDocUUID = this.docs[0].uuid
            return this.docs[0]
        },

        getCurrentDocUUID(): string {
            let uuid = this.currentDocUUID

            if (uuid && uuid.length > 0) {
                LocalDB.saveCurrentDocUUID(uuid)
                return uuid
            }

            let doc = this.getCurrentDoc()

            if (!doc) {
                throw new Error('doc is null')
            }

            LocalDB.saveCurrentDocUUID(doc.uuid)
            return doc.uuid
        },

        setDoc(doc: EditorDoc) {
            let verbose = false;
            if (verbose) {
                console.log(title, 'setDoc', doc)
            }

            if (this.getContent() == doc.content) {
                console.log(title, '更新节点，没变化，忽略')
                return
            }

            this.docs = this.docs.map((element: EditorDoc) => {
                if (element.uuid == doc.uuid) {
                    return doc
                } else {
                    return element
                }
            })

            if (!this.docs.find((element: EditorDoc) => element.uuid == doc.uuid)) {
                this.docs.push(doc)
                this.currentDocUUID = doc.uuid
            }

            let updateData = UpdateData.fromNodeAndDoc(this.node, doc)

            // console.log(title, '更新节点', JSON.stringify(updateData.toObject()))
            // webkit.debugMessage('更新节点' + JSON.stringify(updateData.toObject()))
            // console.log(title, 'node', this.node)
            // console.log(title, 'doc', doc)
            // console.log(title, 'updateData', updateData)

            this.plugins.forEach((plugin) => {
                plugin.onUpdated(updateData)
            })
        }
    },
})