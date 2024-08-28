import { defineStore } from 'pinia'
import TreeNode from '../model/TreeNode'
import EditorDoc from '../model/EditorDoc'
import webkit from '../api/WebKit'
import LocalStore from '../helper/LocalStore'
import Config from '../config/config'
import MarkdownHelper from '../helper/MarkdownHelper'
import Helper from '../helper/Helper'
import UpdateData from '../model/UpdateData'

const config = Config
const isDebug = config.isDebug
const title = "🍋 AppStore"

function getDefaultTreeNode(): TreeNode {
    if (isDebug) {
        return LocalStore.getTreeNode()
    }

    return TreeNode.makeDefaultNode()
}

function getDefaultDocs(): EditorDoc[] {
    if (isDebug) {
        return LocalStore.getDocs() || [EditorDoc.makeDefaultDoc()]
    }

    return [EditorDoc.makeDefaultDoc()]
}

function getDefaultCurrentDocUUID(): string | undefined {
    if (isDebug) {
        return LocalStore.getCurrentDocUUID()
    }

    if (getDefaultDocs().length > 0) {
        return getDefaultDocs()[0].uuid
    }

    return undefined
}

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            isDebug: isDebug,
            node: getDefaultTreeNode(),
            docs: getDefaultDocs(),
            currentDocUUID: getDefaultCurrentDocUUID(),
            drawLink: config.drawLink,
            monacoLink: config.monacoLink,
            loading: true,
            ready: false,
            selectionType: '',
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
            return this.node.content
        },

        getJSON(): string {
            return this.node.json
        },

        getDrawLink(): string {
            return this.drawLink
        },

        getMarkdown(): string {
            return MarkdownHelper.html2markdown(this.node.content)
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

        setCurrentNodeContent: function (content: string) {
            this.loading = true
            let verbose = false;
            if (verbose) {
                console.log(title, 'setCurrentNodeContent')
            }

            this.node.content = content
            this.loading = false

            Helper.toTop()
        },

        /* 
            设置当前节点的子节点，传递一个通过base64编码的JSON数组
            所以要先base64解码再解析成JSON
            为什么不直接传递JSON
            因为Swift中的JSON
            [{ {
                "content": "c=\"my-custom",
                "title": "二"
            }]
            传递到这里，变成了
            [{ {
                "content": "class="my-custom",
                "title": "二"
            }]
        */
        setCurrentNodeChildren: function (children: string) {
            this.loading = true
            let verbose = false;
            if (verbose) {
                console.log(title, 'setCurrentNodeChildren')
            }

            let data = JSON.parse(decodeURIComponent(escape(atob(children))))
            this.node.children = data.map((element: object) => new TreeNode(element))
            this.loading = false

            Helper.toTop()
        },

        updateDoc: function (doc: EditorDoc) {
            console.log(title, "updateDoc", doc)

            this.docs = this.docs.map((element: EditorDoc) => {
                if (element.uuid == doc.uuid) {
                    return doc
                } else {
                    return element
                }
            })

            if (doc.content == this.node.content) {
                console.log(title, '更新节点，没变化，忽略')
                return
            }

            let updateData = UpdateData.fromNodeAndDoc(this.node, doc)

            console.log(title, '更新节点', JSON.stringify(updateData.toObject()))
            webkit.debugMessage('更新节点' + JSON.stringify(updateData.toObject()))
            console.log(title, 'node', this.node)
            console.log(title, 'doc', doc)
            console.log(title, 'updateData', updateData)
            console.log(title, 'isDebug', isDebug)

            if (isDebug) {
                LocalStore.saveTreeNode(this.node.updateDoc(doc))
                LocalStore.saveDocs(this.docs)
            }

            webkit.updateNode(updateData)
        },

        setReady() {
            this.ready = true
            webkit.pageLoaded()
        },

        updateSelectionType(type: string) {
            if (type == this.selectionType) return

            this.selectionType = type
            webkit.updateSelectionType(type)
        },

        getCurrentDoc(): EditorDoc {
            if (this.currentDocUUID) {
                return this.docs.find((doc) => doc.uuid == this.currentDocUUID)!
            }

            console.log(this.docs)

            this.currentDocUUID = this.docs[0].uuid
            return this.docs[0]
        }
    },
})