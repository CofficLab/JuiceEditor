import { defineStore } from 'pinia'
import TreeNode from '../entities/TreeNode'
import EditorData from '../entities/EditorData'
import webkit from '../entities/WebKit'
import codeNode from '../samples/CodeNode'

const isDebug = process.env.NODE_ENV === 'development'

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            node: isDebug ? codeNode : new TreeNode({}),
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

        getContent() {
            return this.node.content
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

        updateNode: function (data: EditorData) {
            if (data.content == this.node.content) {
                console.log('🧮 AppStore: 更新节点，没变化，忽略')
                return
            }

            console.log('🧮 AppStore: 更新节点')
            console.log('🧮 AppStore: 更新节点的数据', data)

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