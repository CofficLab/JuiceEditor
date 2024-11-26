import { TiptapExtension } from '../model/TiptapGroup'
import ImageHelper from "../helper/ImageHelper"
import MessageSendNodes from "../model/MessageSendNodes"
import MessageSendArticle from "../model/MessageSendArticle"
import { NodeStoreStorage } from "./NodeStore"
import { SmartSelectionStorage } from './SmartSelection'
import { priorityOfWebKit } from '../model/TiptapGroup'
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

export interface WebKitStorage {
    verbose: boolean,
    enabled: boolean,
    emoji: string,
    localStorageKey: string,
    sendArticle: boolean,
    sendNodes: boolean,
}

const WebKit = TiptapExtension.create<{}, WebKitStorage>({
    name: "webkit",

    priority: priorityOfWebKit,

    addStorage() {
        return {
            verbose: false,
            enabled: false,
            emoji: "🍎 WebKit",
            localStorageKey: 'html',
            sendArticle: true,
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

        const nodeStore = this.editor.storage.nodeStore as NodeStoreStorage

        // Send Article
        if (this.storage.sendArticle) {
            var messageArticle = (new MessageSendArticle())
                .setNode(nodeStore.article)

            this.editor.chain()
                .webKitSendDebugMessage(this.storage.emoji + ' Update Article')
                .asyncSendMessage(messageArticle)
                .run()
        }

        // Send Nodes
        if (this.storage.sendNodes) {
            var messageNodes = (new MessageSendNodes())
                .setNodes(nodeStore.article.flattened())

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

        const smartSelection = this.editor.storage.selection as SmartSelectionStorage

        // 异步往 webkit 发送数据，防止界面卡顿
        this.editor.commands.asyncSendMessage({
            channel: "updateSelectionType",
            type: smartSelection.type
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
                if (!this.storage.enabled || !('webkit' in window)) {
                    return false
                }

                // if (this.storage.verbose) {
                //     console.log(this.storage.emoji, 'asyncSendMessage', data)
                // }

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

            enableWebKitSendArticle: () => () => {
                this.storage.sendArticle = true;
                return true;
            },

            disableWebKitSendArticle: () => () => {
                this.storage.sendArticle = false;
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
                if (!('webkit' in window)) {
                    return true
                }

                if (this.storage.verbose) {
                    console.log(this.storage.emoji, "🖥️ webkit send message: pageLoaded")
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