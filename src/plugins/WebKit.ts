import Plugin from "../contract/Plugin";
import EditorData from "../model/EditorData";
import TreeNode from "src/model/TreeNode";
import PageMode from "../model/PageMode";
import ImageHelper from "../helper/ImageHelper";
import TiptapHelper from "../helper/TiptapHelper";
import { Root } from "../extensions/Root/Root";
const title = "🍎 WebKit"

class WebKit implements Plugin {
    forPages: PageMode[] = [PageMode.NODE]

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

    onDocUpdated(doc: EditorData): void {
        let verbose = true;

        if (verbose) {
            console.log(title, "onDocUpdated", doc)
        }

        if (!('webkit' in window)) {
            if (verbose) {
                console.log(title, '无 WebKit，忽略更新')
            }
            return
        }

        var messageData: any = {}
        messageData.channel = "updateDoc"
        messageData.title = doc.title
        messageData.html = doc.html
        messageData.nodes = TiptapHelper.flattenBlock(doc.node).map(node => {
            if (node.type == Root.name) {
                node.html = doc.html
            }
            return node
        })
        messageData.wordCount = doc.wordCount
        messageData.characterCount = doc.characterCount

        // 异步往 webkit 发送数据，防止界面卡顿
        asyncSendMessage(messageData).then((result) => {
            console.log(result)
        })
    }

    onDocUpdatedWithNode(doc: EditorData, node: TreeNode): void {
    }

    onDocsUpdated(data: EditorData[]): void {
        let verbose = false;

        if (verbose) {
            console.log(title, 'onDocsUpdated', data)
        }
    }

    onCurrentDocUUIDUpdated(uuid: string): void {
        let verbose = false;

        if (verbose) {
            console.log(title, 'onCurrentDocUUIDUpdated', uuid)
        }

        if (!('webkit' in window)) {
            if (verbose) {
                console.log(title, '无 WebKit，忽略更新')
            }
            return
        }

        sendMessage({
            channel: "updateCurrentDocUUID",
            uuid: uuid
        })
    }

    onLoading(reason: string): void {
        let verbose = false;

        if (!('webkit' in window)) {
            return
        }

        if (verbose) {
            console.log(title, '调用 WebKit 以通知 Swift 页面加载中', reason)
        }

        sendMessage({
            channel: "loading",
            reason: reason
        })
    }

    onConfigChanged(): void {
        let verbose = false;

        if (verbose) {
            console.log(title, '调用 WebKit 以通知 Swift 配置已更新')
        }

        sendMessage({
            channel: "configChanged"
        })
    }

    onReady() {
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
            base64: ImageHelper.getBase64FromBase64Image(src),
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