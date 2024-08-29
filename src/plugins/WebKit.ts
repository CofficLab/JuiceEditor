import UpdateData from "../model/UpdateData";
import Plugin from "../contract/Plugin";
import TreeNode from "../model/TreeNode";
import EditorDoc from "../model/EditorDoc";

const title = "🍎 WebKit"

class WebKit implements Plugin {
    onSelectionTypeChange(type: string): void {
        if (!('webkit' in window)) {
            return
        }

        console.log(title, '调用 WebKit 以更新 SelectionType')
        // 异步往 webkit 发送数据，防止界面卡顿
        this.asyncUpdateSelectionType(type).then((result) => {
            console.log(result)
        })
    }

    onCurrentDocUUIDChange(uuid: string): void {

    }

    onNodeUpdated(data: TreeNode): void {

    }

    onDocUpdated(data: EditorDoc): void {

    }

    onUpdated(data: UpdateData): void {
        let verbose = false;

        if (verbose) {
            console.log(title, data)
            console.log(title, data.toObject())
        }

        if (!('webkit' in window)) {
            if (verbose) {
                console.log(title, '无 WebKit，忽略更新')
            }
            return
        }

        // 异步往 webkit 发送数据，防止界面卡顿
        this.asyncUpdateNodeTask(data).then((result) => {
            console.log(result)
        })
    }

    onPageLoaded() {
        let verbose = false;

        if (!('webkit' in window)) {
            return
        }

        if (verbose) {
            console.log(title, '调用 WebKit 以通知 Swift 页面加载完成')
        }
        try {
            ; (window as any).webkit.messageHandlers.sendMessage.postMessage({
                channel: "pageLoaded"
            })
        } catch (e) {
            console.log(title, '调用 WebKit 以通知 Swift 页面加载完成，失败', e)
        }
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
                (window as any).webkit.messageHandlers.sendMessage.postMessage({
                    channel: "runCode",
                    code: code,
                    lan: lan
                })
            } catch (e) {
                console.log(title, '运行代码失败', e)
            }
        }, 500)
    }

    downloadImage(base64: String, name: String) {
        if (!('webkit' in window)) {
            console.log(title, '下载图片，无 WebKit，忽略')
            return
        }

        (window as any).webkit.messageHandlers.sendMessage.postMessage({
            channel: "downloadFile",
            base64: base64,
            name: name
        })
    }

    asyncUpdateSelectionType(type: string) {
        return new Promise((resolve, reject) => {
            try {
                // 只能传字符、只能传普通object
                (window as any).webkit.messageHandlers.sendMessage.postMessage({
                    channel: "updateSelectionType",
                    type: type
                })
            } catch (e) {
                console.log(title, '更新内容失败', e)
                reject(e)
            }

            resolve('🍎 WebKit: 已发送SelectionType更新');
        });
    }

    asyncUpdateNodeTask(data: UpdateData) {
        let verbose = false;
        return new Promise((resolve, reject) => {
            try {
                // 只能传字符、只能传普通object
                (window as any).webkit.messageHandlers.sendMessage.postMessage(data.toObject())
            } catch (e) {
                console.log(title, '更新内容失败', e)
                reject(e)
            }

            if (verbose) {
                resolve(title + ' 已发送Content更新');
            }
        });
    }

    onMessage(message: string) {
        if (!('webkit' in window)) {
            return
        }

        (window as any).webkit.messageHandlers.sendMessage.postMessage({
            channel: "message",
            message: message
        })
    }
}

export default WebKit