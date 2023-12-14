import { defineStore } from 'pinia'
import Sample from '../entities/Sample'
import TreeNode from '../entities/TreeNode'

const isDebug = process.env.NODE_ENV === 'development'

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            node: isDebug ? Sample.sampleNode : new TreeNode({}),
            loading: false,
            ready: false,
        }
    },

    actions: {
        getContent() {
            return this.node.content
        },

        updateNode: function (data: object) {
            this.loading = true
            console.log('更新节点')

            const oldNode = this.node.toJSON()

            this.node = this.node.update(data)

            document.dispatchEvent(new CustomEvent('close-draw'))

            this.loading = false

            if (this.node.toJSON() == oldNode) {
                console.log('更新节点时发现无变化，无需通知 WebKit', this.node, oldNode)
                return
            }

            if (!('webkit' in window)) {
                return
            }

            console.log('调用 WebKit 以更新节点内容')
            setTimeout(() => {
                try {
                    // 只能传字符、只能传普通object
                    ; (window as any).webkit.messageHandlers.updateContent.postMessage({
                        content: this.node.content,
                        title: this.node.title,
                        id: this.node.id,
                        characterCount: `${this.node.characterCount}`,
                        wordCount: `${this.node.wordCount}`
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