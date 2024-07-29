import { defineStore } from 'pinia'
import TreeNode from '../entities/TreeNode'
import EditorData from '../entities/EditorData'
import webkit from '../entities/WebKit'
import TurndownService from 'turndown'
import LocalStore from './LocalStore'

const isDebug = process.env.NODE_ENV === 'development'

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            node: isDebug ? new TreeNode(LocalStore.getData()) : new TreeNode({}),
            loading: false,
            ready: false,
            selectionType: '',
        }
    },

    actions: {
        closeDraw: function () {
            console.log('🍋 AppStore: close draw')
            document.dispatchEvent(new CustomEvent('close-draw'))
        },

        getContent(): string {
            return this.node.content
        },

        getMarkdown(): string {
            let html = this.node.content

            var turndownService = new TurndownService({
                headingStyle: 'atx',
            })
            var markdown = turndownService.turndown(html)

            return markdown
        },

        setCurrentNode: function (data: object) {
            this.loading = true
            console.log('🍋 AppStore: setCurrentNode && close draw')

            this.node = new TreeNode(data)

            document.dispatchEvent(new CustomEvent('close-draw'))

            this.loading = false
        },

        setCurrentNodeContent: function (content: string) {
            this.loading = true
            console.log('🍋 AppStore: setCurrentNodeContent')

            this.node.content = content
            this.loading = false
        },

        // 设置当前节点的子uuid和content，其中content传递一个通过base64编码的字符
        setUUIDAndContent: function (uuid: string, content: string) {
            this.loading = true
            console.log('🍋 AppStore: setUUIDAndContent')

            let newNode = this.node
            newNode.uuid = uuid
            newNode.content = decodeURIComponent(escape(atob(content)))

            // 会触发编辑器的更新
            this.node = newNode

            this.loading = false
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
            console.log('🍋 AppStore: setCurrentNodeChildren')

            let data = JSON.parse(decodeURIComponent(escape(atob(children))))
            this.node.children = data.map((element: object) => new TreeNode(element))
            this.loading = false
        },

        updateNode: function (data: EditorData) {
            if (data.content == this.node.content) {
                console.log('🧮 AppStore: 更新节点，没变化，忽略')
                return
            }

            console.log('🧮 AppStore: 更新节点')
            // console.log('🧮 AppStore: 更新节点的数据', data)

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