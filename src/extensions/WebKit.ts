// runCode(code: string, lan: string, callback: (result: string) => void) {
//     if (!('webkit' in window)) {
//         return setTimeout(() => callback('在 macOS 的 App Store 中搜索「快易知」运行代码'), 1000)
//     }

//     console.log(title, '调用 WebKit 以运行代码', code)

//     window.runnerCallback = function (result: string) {
//         callback(decodeURIComponent(result))
//     }

//     setTimeout(() => {
//         try {
//             // 只能传字符、只能传普通object
//             sendMessage({
//                 channel: "runCode",
//                 code: code,
//                 lan: lan
//             })
//         } catch (e) {
//             console.log(title, '运行代码失败', e)
//         }
//     }, 500)
// }

import { Extension, JSONContent } from "@tiptap/core"
import TiptapHelper from "../helper/TiptapHelper"
import { Root } from "./Root/Root"
import ImageHelper from "../helper/ImageHelper"
import UUIDHelper from "../helper/UUIDHelper"
import SmartDoc from "./SmartDoc"

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        WebKit: {
            sendToWebKit: () => ReturnType
            webKitSendMessage: (data: object) => ReturnType
            webKitSendDebugMessage: (message: string) => ReturnType
            asyncSendMessage: (data: object) => ReturnType
            enableWebKit: () => ReturnType
            disableWebKit: () => ReturnType
            enableWebKitVerbose: () => ReturnType
            disableWebKitVerbose: () => ReturnType
            webKitDownloadImage: (src: string, name: string) => ReturnType
        }
    }
}


function flattenBlock(block: JSONContent): JSONContent[] {
    var newBlock = block

    if (newBlock.attrs == null) {
        newBlock.attrs = {}
    }

    if (newBlock.attrs.uuid == null) {
        newBlock.attrs.uuid = UUIDHelper.generate();
    }

    if (newBlock.type == Root.name) {
        newBlock.attrs.title = getTitle(newBlock)
    }

    var children = newBlock.content || []

    if (children.length > 0) {
        children.map(child => {
            child.attrs = child.attrs || {};

            if (child.type == Text.name) {
                if (newBlock.attrs && newBlock.attrs.uuid) {
                    child.attrs.uuid = "text-" + newBlock.attrs.uuid;
                }
            }

            if (newBlock.type !== SmartDoc.name) {
                child.attrs.parent = newBlock.attrs!.uuid;
            }
        });
    }

    var flattened: JSONContent[] = []

    if (newBlock.type != SmartDoc.name) {
        flattened.push(newBlock)
    }

    if (children.length > 0) {
        children.forEach(content => {
            flattened = flattened.concat(flattenBlock(content))
        })
    }

    const collection = flattened.map(b => {
        const { content, ...rest } = b;
        return rest;
    });

    collection.forEach(b => {
        if (!b.attrs?.uuid) {
            console.warn("uuid is null", b)
        }
    })

    return collection
}

function getTitle(json: JSONContent): string {
    if (json.type == Text.name) {
        return json.text ?? ""
    }

    let content = json.content
    if (!content || content.length == 0) {
        return ""
    }

    return getTitle(content[0])
}

export const WebKit = Extension.create({
    name: "webkit",

    addStorage() {
        return {
            verbose: true,
            enabled: false,
            emoji: "🍎 WebKit",
            localStorageKey: 'html',
        }
    },

    onBeforeCreate() {
        if (!this.storage.enabled) {
            return
        }


        console.log(this.storage.emoji, "onBeforeCreate")

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

    onCreate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onCreate")
        }

        // send message even if enabled is false

        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, 'webkit send message: pageLoaded')
        }

        if (!('webkit' in window)) {
            return
        }

        this.editor.commands.webKitSendMessage({
            channel: "pageLoaded"
        })
    },

    onUpdate() {
        if (!this.storage.enabled) {
            return
        }

        console.log(this.storage.emoji, "onUpdate")

        if (!('webkit' in window)) {
            return
        }

        this.editor.commands.webKitSendDebugMessage(this.storage.emoji + ' 更新文档')

        var messageData: any = {}
        messageData.channel = "updateDoc"
        messageData.title = this.editor.storage.title
        messageData.html = this.editor.getHTML()
        messageData.nodes = flattenBlock(this.editor.getJSON()).map(node => {
            if (node.type == Root.name) {
                node.html = this.editor.getHTML()
            }
            return node
        })
        messageData.wordCount = this.editor.storage.characterCount.words()
        messageData.characterCount = this.editor.storage.characterCount.characters()

        // 异步往 webkit 发送数据，防止界面卡顿
        this.editor.commands.asyncSendMessage(messageData)
    },

    onSelectionUpdate() {
        if (!this.storage.enabled) {
            return
        }

        console.log(this.storage.emoji, "onSelectionUpdate")

        if (!('webkit' in window)) {
            return
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
            sendToWebKit: () => () => {

                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'saveDoc')
                }

                // localStorage.setItem('doc', doc.toJSONString())

                return true
            },

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
            }
        }
    }
})
