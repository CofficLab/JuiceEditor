import { channel } from "diagnostics_channel";
import Plugin from "../contract/Plugin";
import EditorDoc from "../model/EditorDoc";
import { send } from "vite";
import TreeNode from "src/model/TreeNode";

const title = "🍎 WebKit"

class WebKit implements Plugin {
    onSelectionTypeChange(type: string): void {
        if (!('webkit' in window)) {
            return
        }

        console.log(title, '调用 WebKit 以更新 SelectionType')

        // 异步往 webkit 发送数据，防止界面卡顿
        asyncSendMessage({
            channel: "updateSelectionType",
            type: type
        }).then((result) => {
            console.log(result)
        })
    }

    onDocUpdated(data: EditorDoc): void {
        let verbose = false;

        if (verbose) {
            console.log(title, "onDocUpdated", data)
        }

        if (!('webkit' in window)) {
            if (verbose) {
                console.log(title, '无 WebKit，忽略更新')
            }
            return
        }

        var messageData = data.toDictForWebKit();
        messageData.channel = "updateDoc"

        // 异步往 webkit 发送数据，防止界面卡顿
        asyncSendMessage(messageData).then((result) => {
            console.log(result)
        })
    }

    onDocUpdatedWithNode(data: EditorDoc, node: TreeNode): void {
        let verbose = false;

        if (verbose) {
            console.log(title, "onDocUpdated", data)
        }

        if (!('webkit' in window)) {
            if (verbose) {
                console.log(title, '无 WebKit，忽略更新')
            }
            return
        }

        var messageData = data.toDictForWebKit();
        messageData.channel = "updateDocWithNode"
        messageData.nodeUUID = node.uuid

        // 异步往 webkit 发送数据，防止界面卡顿
        asyncSendMessage(messageData).then((result) => {
            console.log(result)
        })
    }

    onDocsUpdated(data: EditorDoc[]): void {
        let verbose = false;

        if (verbose) {
            console.log(title, 'onDocsUpdated', data)
        }
    }

    onPageLoaded() {
        let verbose = false;

        if (!('webkit' in window)) {
            return
        }

        if (verbose) {
            console.log(title, '调用 WebKit 以通知 Swift 页面加载完成')
        }

        sendMessage({
            channel: "pageLoaded"
        })
    }

    runCode(code: string, lan: string, callback: (result: string) => void) {
        if (!('webkit' in window)) {
            return setTimeout(() => callback('在 macOS 的 App Store 中搜索「快易知」运行代码'), 1000)
        }

        console.log(title, '调用 WebKit 以运行代码', code)

        window.runnerCallback = function (result: string) {
            callback(decodeURIComponent(result))
        }

        setTimeout(() => {
            try {
                // 只能传字符、只能传普通object
                sendMessage({
                    channel: "runCode",
                    code: code,
                    lan: lan
                })
            } catch (e) {
                console.log(title, '运行代码失败', e)
            }
        }, 500)
    }

    onDownloadImage(src: string, name: string) {
        if (!('webkit' in window)) {
            console.log(title, '下载图片，无 WebKit，忽略')
            return
        }

        sendMessage({
            channel: "downloadFile",
            base64: src,
            name: name
        })
    }

    onMessage(message: string) {
        if (!('webkit' in window)) {
            return
        }

        sendMessage({
            channel: "message",
            message: message
        })
    }
}

export default WebKit

function sendMessage(data: object) {
    try {
        (window as any).webkit.messageHandlers.sendMessage.postMessage(data);
    } catch (e) {
        console.log(title, '发送消息失败', e);
        throw e
    }
}

function asyncSendMessage(data: object) {
    let verbose = false;

    return new Promise((resolve, reject) => {
        try {
            (window as any).webkit.messageHandlers.sendMessage.postMessage(data);
        } catch (e) {
            console.log(title, '发送消息失败', e);
            reject(e);

            throw e
        }

        if (verbose) {
            resolve(title + ' 已发送消息');
        }
    });
}