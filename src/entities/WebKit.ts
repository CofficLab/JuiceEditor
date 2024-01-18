import EditorData from "./EditorData"

const webkit = {
    pageLoaded() {
        if (!('webkit' in window)) {
            return
        }

        console.log('WebKit: 调用 WebKit 以通知 Swift 页面加载完成')
        try {
            ; (window as any).webkit.messageHandlers.sendMessage.postMessage({
                channel: "pageLoaded"
            })
        } catch (e) {
            console.log('WebKit: 调用 WebKit 以通知 Swift 页面加载完成，失败', e)
        }
    },

    updateNode(data: EditorData) {
        // console.log("更新节点", data)
        if (!('webkit' in window)) {
            return
        }

        console.log('WebKit: 调用 WebKit 以更新节点内容', data.uuid)
        setTimeout(() => {
            try {
                // 只能传字符、只能传普通object
                (window as any).webkit.messageHandlers.sendMessage.postMessage({
                    channel: 'updateNode',
                    content: data.content,
                    title: data.title,
                    uuid: data.uuid,
                    characterCount: `${data.characterCount}`,
                    wordCount: `${data.wordCount}`
                })
            } catch (e) {
                console.log('更新内容失败', e)
            }
        }, 0)
    },

    updateSelectionType(type: string) {
        if (!('webkit' in window)) {
            return
        }

        console.log('WebKit: 调用 WebKit 以更新 SelectionType')
        setTimeout(() => {
            try {
                // 只能传字符、只能传普通object
                (window as any).webkit.messageHandlers.sendMessage.postMessage({
                    channel: "updateSelectionType",
                    type: type
                })
            } catch (e) {
                console.log('更新内容失败', e)
            }
        }, 0)
    }
}

export default webkit