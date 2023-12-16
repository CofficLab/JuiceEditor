import { defineStore } from 'pinia'
import Sample from '../entities/Sample'
import TreeNode from '../entities/TreeNode'
import EditorData from '../entities/EditorData'

const isDebug = process.env.NODE_ENV === 'development'

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            node: isDebug ? Sample.bigNode : new TreeNode({}),
            loading: false,
            ready: false,
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

            if (!('webkit' in window)) {
                return
            }

            console.log('调用 WebKit 以更新节点内容')
            setTimeout(() => {
                try {
                    // 只能传字符、只能传普通object
                    (window as any).webkit.messageHandlers.updateContent.postMessage({
                        content: data.content,
                        title: data.title,
                        id: data.uuid,
                        characterCount: `${data.characterCount}`,
                        wordCount: `${data.wordCount}`
                    })
                } catch (e) {
                    console.log('更新内容失败', e)
                }
            }, 0)
        },

        setReady() {
            this.ready = true

            if (!('webkit' in window)) {
                return
            }

            console.log('调用 WebKit 以通知 Swift 页面加载完成')
            try {
                ; (window as any).webkit.messageHandlers.pageLoaded.postMessage({})
            } catch (e) {
                console.log('调用 WebKit 以通知 Swift 页面加载完成，失败', e)
            }
        }
    },
})