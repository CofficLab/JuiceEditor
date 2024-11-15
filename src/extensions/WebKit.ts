import { TiptapExtension } from '../model/TiptapGroup'
import ImageHelper from "../helper/ImageHelper"

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        WebKit: {
            webKitSendMessage: (data: object) => ReturnType
            webKitSendDebugMessage: (message: string) => ReturnType
            asyncSendMessage: (data: object) => ReturnType
            enableWebKit: () => ReturnType
            disableWebKit: () => ReturnType
            enableWebKitVerbose: () => ReturnType
            disableWebKitVerbose: () => ReturnType
            webKitDownloadImage: (src: string, name: string) => ReturnType
            bootWebKit: () => ReturnType
        }
    }
}

export const WebKit = TiptapExtension.create({
    name: "webkit",

    addStorage() {
        return {
            verbose: false,
            enabled: false,
            emoji: "🍎 WebKit",
            localStorageKey: 'html',
            sendHtml: true,
            sendNodes: true,
        }
    },

    onBeforeCreate() {
        if (!this.storage.enabled) {
            return
        }

        if (!('webkit' in window)) {
            return
        }

        if (this.storage.verbose) {
            console.log(this.storage.emoji, '调用 WebKit 以通知 Swift 页面加载中')
        }

        this.editor.commands.webKitSendMessage({
            channel: "loading",
        })
    },

    onUpdate() {
        if (!this.storage.enabled) {
            return
        }

        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, 'onUpdate, sendNodes:', this.storage.sendNodes, 'sendHtml:', this.storage.sendHtml)
            console.log(this.storage.emoji, 'onUpdate, editor.getHTML()', this.editor.getHTML())
            console.log(this.storage.emoji, 'onUpdate, nodes', this.editor.storage.smartNodes.nodes)
        }

        if (!('webkit' in window)) {
            return
        }

        if (this.storage.sendNodes) {
            var messageData: any = {}
            messageData.channel = "updateNodes"
            messageData.title = this.editor.storage.smartNodes.title
            messageData.nodes = this.editor.storage.smartNodes.nodes
            messageData.wordCount = this.editor.storage.characterCount.words()
            messageData.characterCount = this.editor.storage.characterCount.characters()

            this.editor.commands.webKitSendDebugMessage(this.storage.emoji + ' Update Nodes: ' + messageData.nodes.length)

            // 异步往 webkit 发送数据，防止界面卡顿
            this.editor.commands.asyncSendMessage(messageData)
        }

        if (this.storage.sendHtml) {
            var messageData: any = {}
            messageData.channel = "updateHTML"
            messageData.title = this.editor.storage.smartNodes.title
            messageData.html = this.editor.getHTML()
            messageData.wordCount = this.editor.storage.characterCount.words()
            messageData.characterCount = this.editor.storage.characterCount.characters()

            this.editor.commands.webKitSendDebugMessage(this.storage.emoji + ' Update HTML: ' + messageData.html.length)

            // 异步往 webkit 发送数据，防止界面卡顿
            this.editor.commands.asyncSendMessage(messageData)
        }
    },

    onSelectionUpdate() {
        if (!this.storage.enabled) {
            return false
        }

        if (!('webkit' in window)) {
            return false
        }

        // 异步往 webkit 发送数据，防止界面卡顿
        this.editor.commands.asyncSendMessage({
            channel: "updateSelectionType",
            type: this.editor.storage.selection.type
        })

        return true
    },

    addCommands() {
        return {
            webKitSendDebugMessage: (message: string) => () => {
                if (!this.storage.enabled || !('webkit' in window)) {
                    return false
                }

                if (this.storage.verbose) {
                    console.log(this.storage.emoji, '发送调试消息', message)
                }

                this.editor.commands.webKitSendMessage({
                    channel: "debug",
                    message: message
                })

                return true
            },

            webKitSendMessage: (data: object) => () => {
                if (!('webkit' in window)) {
                    return false
                }

                try {
                    (window as any).webkit.messageHandlers.sendMessage.postMessage(data);
                    if (this.storage.verbose) {
                        console.log(this.storage.emoji, '已发送消息', data)
                    }
                } catch (e: any) {
                    console.warn(this.storage.emoji, '发送消息失败', e.message);
                    return false
                }

                return true
            },

            asyncSendMessage: (data: object) => () => {
                console.log("webkit:asyncSendMessage", data)
                new Promise((resolve, reject) => {
                    try {
                        (window as any).webkit.messageHandlers.sendMessage.postMessage(data);
                    } catch (e: any) {
                        console.log(this.storage.emoji, '发送消息失败', e);
                        this.editor.commands.webKitSendDebugMessage(this.storage.emoji + ' 发送消息失败: ' + e.message)
                        reject(e);

                        throw e
                    }

                    if (this.storage.verbose) {
                        console.log(this.storage.emoji, '已发送消息')
                        this.editor.commands.webKitSendDebugMessage(this.storage.emoji + ' 已发送消息')
                        resolve(this.storage.emoji + ' 已发送消息');
                    }
                });

                return true;
            },

            enableWebKit: () => () => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, '启用 WebKit')
                }

                this.storage.enabled = true;

                return true;
            },

            disableWebKit: () => () => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, '禁用 WebKit')
                }

                this.storage.enabled = false;

                return true;
            },

            enableWebKitVerbose: () => () => {
                this.storage.verbose = true;

                return true;
            },

            enableWebKitSendHtml: () => () => {
                this.storage.sendHtml = true;
                return true;
            },

            disableWebKitSendHtml: () => () => {
                this.storage.sendHtml = false;
                return true;
            },

            enableWebKitSendNodes: () => () => {
                this.storage.sendNodes = true;
                return true;
            },

            disableWebKitSendNodes: () => () => {
                this.storage.sendNodes = false;
                return true;
            },

            disableWebKitVerbose: () => () => {
                this.storage.verbose = false;

                return true;
            },

            webKitDownloadImage: (src: string, name: string) => () => {
                if (!this.storage.enabled || !('webkit' in window)) {
                    return false;
                }

                return this.editor.commands.webKitSendMessage({
                    channel: "downloadFile",
                    base64: ImageHelper.getBase64FromBase64Image(src),
                    name: name
                });
            },

            /**
             * call this method when editor view is mounted
             */
            bootWebKit: () => () => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, "bootWebKit")
                }

                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, 'webkit send message: pageLoaded')
                }

                if (!('webkit' in window)) {
                    return true
                }

                this.editor.commands.webKitSendMessage({
                    channel: "pageLoaded"
                })

                return true
            }
        }
    }
})
