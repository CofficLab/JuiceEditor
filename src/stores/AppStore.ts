import { defineStore } from 'pinia'
import Sample from '../entities/Sample'
import TreeNode from '../entities/TreeNode'
import EditorData from '../entities/EditorData'
import webkit from '../entities/WebKit'

const isDebug = process.env.NODE_ENV === 'development'

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            node: isDebug ? Sample.tableNode : new TreeNode({}),
            loading: false,
            ready: false,
            selectionType: '',
        }
    },

    actions: {
        getContent() {
            return this.node.content
        },

        setCurrentNode: function (data: object) {
            this.loading = true
            console.log('设置当前节点', data)

            this.node = new TreeNode(data)

            document.dispatchEvent(new CustomEvent('close-draw'))

            this.loading = false
        },

        updateNode: function (data: EditorData) {
            console.log('更新节点', data)
            webkit.updateNode(data)
        },

        setReady() {
            this.ready = true
            webkit.pageLoaded()
        },

        updateSelectionType(type: string) {
            this.selectionType = type
            webkit.updateSelectionType(type)
        }
    },
})