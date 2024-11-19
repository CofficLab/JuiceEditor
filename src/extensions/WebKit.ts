import { TiptapExtension } from '../model/TiptapGroup'
import ImageHelper from "../helper/ImageHelper"
import EditorNode from "../model/EditorNode"
import MessageSendNodes from "../model/MessageSendNodes"
import MessageSendDoc from "../model/MessageSendDoc"

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
            disableWebKitSendNodes: () => ReturnType
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
            sendDoc: true,
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

        if (!('webkit' in window)) {
            return
        }

        // Send Doc
        if (this.storage.sendDoc) {
            var messageDoc = (new MessageSendDoc())
                .setNode(this.editor.storage.doc.doc)

            this.editor.chain()
                .webKitSendDebugMessage(this.storage.emoji + ' Update Doc')
                .asyncSendMessage(messageDoc)
                .run()
        }

        // Send Nodes
        if (this.storage.sendNodes) {
            var messageNodes = (new MessageSendNodes())
                .setNodes(this.editor.storage.doc.doc.flattened())

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
                    console.warn(this.storage.emoji, 'webKitSendMessage with error', e.message);
                    return false
                }

                return true
            },

            asyncSendMessage: (data: object) => () => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'asyncSendMessage', data)
                }

                new Promise(() => {
                    try {
                        (window as any).webkit.messageHandlers.sendMessage.postMessage(data);
                    } catch (e: any) {
                        console.log(this.storage.emoji, 'asyncSendMessage with error', e);
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