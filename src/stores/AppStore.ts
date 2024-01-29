import { defineStore } from 'pinia'
import Sample from '../entities/Sample'
import TreeNode from '../entities/TreeNode'
import EditorData from '../entities/EditorData'
import webkit from '../entities/WebKit'

const isDebug = process.env.NODE_ENV === 'development'

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            node: isDebug ? Sample.sampleNode : new TreeNode({}),
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

        updateNode: function (data: EditorData) {
            if (data.content == this.node.content) {
                console.log('🧮 AppStore: 更新节点，没变化，忽略')
                return
            }

            console.log('🧮 AppStore: 更新节点')

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