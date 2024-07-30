import EditorData from "../model/EditorData"

const webkit = {
    pageLoaded() {
        if (!('webkit' in window)) {
            return
        }

        console.log('🍎 WebKit: 调用 WebKit 以通知 Swift 页面加载完成')
        try {
            ; (window as any).webkit.messageHandlers.sendMessage.postMessage({
                channel: "pageLoaded"
            })
        } catch (e) {
            console.log('WebKit: 调用 WebKit 以通知 Swift 页面加载完成，失败', e)
        }
    },

    updateNode(data: EditorData) {
        if (!('webkit' in window)) {
            console.log("🍎 WebKit: 无 WebKit，忽略更新")
            return
        }

        console.log('🍎 WebKit: 调用 WebKit 以更新节点内容', data.uuid, data.title)

        // 异步往 webkit 发送数据，防止界面卡顿
        this.asyncUpdateNodeTask(data).then((result) => {
            console.log(result)
        })
    },

    updateSelectionType(type: string) {
        if (!('webkit' in window)) {
            return
        }

        console.log('🍎 WebKit: 调用 WebKit 以更新 SelectionType')
        // 异步往 webkit 发送数据，防止界面卡顿
        this.asyncUpdateSelectionType(type).then((result) => {
            console.log(result)
        })
    },

    runCode(code: string, lan: string, callback: (result: string) => void) {
        if (!('webkit' in window)) {
            return setTimeout(() => callback('在 macOS 的 App Store 中搜索「快易知」运行代码'), 1000)
        }

        console.log('WebKit: 调用 WebKit 以运行代码', code)

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
                console.log('运行代码失败', e)
            }
        }, 500)
    },

    downloadImage(base64: String, name: String) {
        if (!('webkit' in window)) {
            console.log("🍎 WebKit: 下载图片，无 WebKit，忽略")
            return
        }

        (window as any).webkit.messageHandlers.sendMessage.postMessage({
            channel: "downloadFile",
            base64: base64,
            name: name
        })
    },

    asyncUpdateSelectionType(type: string) {
        return new Promise((resolve, reject) => {
            try {
                // 只能传字符、只能传普通object
                (window as any).webkit.messageHandlers.sendMessage.postMessage({
                    channel: "updateSelectionType",
                    type: type
                })
            } catch (e) {
                console.log('更新内容失败', e)
                reject(e)
            }

            resolve('🍎 WebKit: 已发送SelectionType更新');
        });
    },

    asyncUpdateNodeTask(data: EditorData) {
        return new Promise((resolve, reject) => {
            try {
                // 只能传字符、只能传普通object
                (window as any).webkit.messageHandlers.sendMessage.postMessage({
                    channel: 'updateNode',
                    content: data.content,
                    json: JSON.stringify(data.json),
                    title: data.title,
                    uuid: data.uuid,
                    characterCount: `${data.characterCount}`,
                    wordCount: `${data.wordCount}`
                })
            } catch (e) {
                console.log('更新内容失败', e)
                reject(e)
            }

            resolve('🍎 WebKit: 已发送Content更新');
        });
    }
}

export default webkit