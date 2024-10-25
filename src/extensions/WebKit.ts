

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

// onDownloadImage(src: string, name: string) {
//     if (!('webkit' in window)) {
//         console.log(title, '下载图片，无 WebKit，忽略')
//         return
//     }

//     sendMessage({
//         channel: "downloadFile",
//         base64: ImageHelper.getBase64FromBase64Image(src),
//         name: name
//     })
// }

// onMessage(message: string) {
//     if (!('webkit' in window)) {
//         return
//     }

//     sendMessage({
//         channel: "message",
//         message: message
//     })
// }
// }








import { Extension } from "@tiptap/core"

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        WebKit: {
            sendToWebKit: () => ReturnType
        }
    }
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
        console.log(this.storage.emoji, "onBeforeCreate")

        // let verbose = false;

        // if (!('webkit' in window)) {
        //     return
        // }

        // if (verbose) {
        //     console.log(title, '调用 WebKit 以通知 Swift 页面加载中', reason)
        // }

        // sendMessage({
        //     channel: "loading",
        //     reason: reason
        // })
    },

    onCreate() {
        console.log(this.storage.emoji, "onCreate")


        // let verbose = false;

        // if (!('webkit' in window)) {
        //     return
        // }

        // if (verbose) {
        //     console.log(title, '调用 WebKit 以通知 Swift 页面加载完成')
        // }

        // sendMessage({
        //     channel: "pageLoaded"
        // })
    },

    onUpdate() {
        console.log(this.storage.emoji, "onUpdate")

        // let verbose = true;

        // if (verbose) {
        //     console.log(title, "onDocUpdated", doc)
        // }

        // if (!('webkit' in window)) {
        //     if (verbose) {
        //         console.log(title, '无 WebKit，忽略更新')
        //     }
        //     return
        // }

        // var messageData: any = {}
        // messageData.channel = "updateDoc"
        // messageData.title = doc.title
        // messageData.html = doc.html
        // messageData.nodes = TiptapHelper.flattenBlock(doc.node).map(node => {
        //     if (node.type == Root.name) {
        //         node.html = doc.html
        //     }
        //     return node
        // })
        // messageData.wordCount = doc.wordCount
        // messageData.characterCount = doc.characterCount

        // // 异步往 webkit 发送数据，防止界面卡顿
        // asyncSendMessage(messageData).then((result) => {
        //     console.log(result)
        // })
    },

    onSelectionUpdate() {
        console.log(this.storage.emoji, "onSelectionUpdate")


        if (!('webkit' in window)) {
            return
        }

        console.log(this.storage.emoji, '调用 WebKit 以更新 SelectionType')

        // // 异步往 webkit 发送数据，防止界面卡顿
        // asyncSendMessage({
        //     channel: "updateSelectionType",
        //     type: type
        // }).then((result) => {
        //     console.log(result)
        // })
        //     }
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
            sendMessage: (data: object) => () => {
                try {
                    (window as any).webkit.messageHandlers.sendMessage.postMessage(data);
                } catch (e) {
                    console.log(this.storage.emoji, '发送消息失败', e);
                    throw e
                }

                return true
            },
            asyncSendMessage: (data: object) => () => {
                let verbose = false;

                return new Promise((resolve, reject) => {
                    try {
                        (window as any).webkit.messageHandlers.sendMessage.postMessage(data);
                    } catch (e) {
                        console.log(this.storage.emoji, '发送消息失败', e);
                        reject(e);

                        throw e
                    }

                    if (verbose) {
                        resolve(this.storage.emoji + ' 已发送消息');
                    }
                });
            }
        }
    }
})