import { TiptapExtension } from '../model/TiptapGroup'
import ImageHelper from "../helper/ImageHelper"
import EditorNode from "../model/EditorNode"
import MessageSendNodes from "../model/MessageSendNodes"
import MessageSendNode from "../model/MessageSendNode"

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
            setWebKitVerbose: (value: boolean) => ReturnType
        }
    }
}

const WebKit = TiptapExtension.create({
    name: "webkit",

    addStorage() {
        return {
            verbose: false,
            enabled: false,
            emoji: "🍎 WebKit",
            localStorageKey: 'html',
            sendNode: true,
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

        if (this.storage.verbose) {
            let doc = this.editor.storage.doc.doc
            console.log(this.storage.emoji, 'onUpdate, doc')
            console.log(this.storage.emoji, doc)
            console.log(this.storage.emoji, 'onUpdate, nodes', doc.flattened())
        }

        if (!('webkit' in window)) {
            return
        }

        // Send Node
        if (this.storage.sendNode) {
            var messageNode = (new MessageSendNode())
                .setNode(this.editor.storage.doc.node)

            this.editor.chain()
                .webKitSendDebugMessage(this.storage.emoji + ' Update Node')
                .asyncSendMessage(messageNode)
                .run()
        }

        // Send Nodes
        if (this.storage.sendNodes) {
            var messageNodes = (new MessageSendNodes())
                .setNodes(this.editor.storage.doc.nodes)

            this.editor.chain()
                .webKitSendDebugMessage(this.storage.emoji + ' Update Nodes')
                .asyncSendMessage(messageNodes)
                .run()
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
                } catch (e: any) {
                    console.warn(this.storage.emoji, '发送消息失败', e.message);
                    return false
                }

                return true
            },

            asyncSendMessage: (data: object) => () => {
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
                        resolve(this.storage.emoji + ' 已发送消息');
                    }
                });

                return true;
            },

            enableWebKit: () => () => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, '✅ enableWebKit')
                }

                this.storage.enabled = true;

                return true;
            },

            disableWebKit: () => () => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, '禁用 WebKit')
                }

                this.storage.enabled = false;

                return true;
            },

            enableWebKitVerbose: () => () => {
                this.storage.verbose = true;

                return true;
            },

            enableWebKitSendNode: () => () => {
                this.storage.sendNode = true;
                return true;
            },

            disableWebKitSendNode: () => () => {
                this.storage.sendNode = false;
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

            bootWebKit: () => () => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, "🖥️ webkit send message: pageLoaded")
                }

                if (!('webkit' in window)) {
                    return true
                }

                this.editor.commands.webKitSendMessage({
                    channel: "pageLoaded"
                })

                return true
            },

            setWebKitVerbose: (value: boolean) => () => {
                this.storage.verbose = value
                return true
            },
        }
    }
})

export default WebKit