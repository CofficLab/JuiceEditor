import { defineStore } from 'pinia'
import TreeNode from '../model/TreeNode'
import EditorData from '../model/EditorData'
import webkit from '../api/WebKit'
import LocalStore from './LocalStore'
import Config from '../config/config'
import MarkdownHelper from '../helper/MarkdownHelper'
import Helper from '../helper/Helper'

const verbose = true
const config = Config
const isDebug = config.isDebug
const title = "🍋 AppStore"

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            isDebug: isDebug,
            node: new TreeNode({}),
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

        // 设置当前节点的子uuid和content，其中content传递一个通过base64编码的字符
        setUUIDAndContent: function (uuid: string, content: string) {
            let verbose = false;
            this.loading = true
            if (verbose) {
                console.log(title, 'setUUIDAndContent')
            }

            let newNode = this.node
            newNode.uuid = uuid
            newNode.content = JSON.stringify(JSON.parse(atob(content)))

            if (verbose) {
                console.log(title, 'setUUIDAndContent', newNode.content)
            }

            // 会触发编辑器的更新
            this.node = newNode

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

        updateNode: function (data: EditorData) {
            if (data.content == this.node.content) {
                console.log(title, '更新节点，没变化，忽略')
                return
            }

            console.log(title, '更新节点')

            if (isDebug) {
                LocalStore.saveData(data)
            }

            webkit.updateNode(data)
        },

        setReady() {
            this.ready = true
            webkit.pageLoaded()
        },

        updateSelectionType(type: string) {
            if (type == this.selectionType) return

            this.selectionType = type
            webkit.updateSelectionType(type)
        }
    },
})