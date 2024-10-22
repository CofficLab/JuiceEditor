import SmartTool from "../../helper/SmartTool";
import { Editor } from "@tiptap/core";
import SmartImage from "./SmartImage";

function makeDrawDialog(drawIoLink: string): HTMLDialogElement {
    const drawingPage = document.createElement('iframe')
    drawingPage.setAttribute('frameborder', '0')
    drawingPage.setAttribute('src', makeDrawUrl(drawIoLink))
    drawingPage.setAttribute('width', '100%')
    drawingPage.setAttribute('height', '100%')

    const drawingDialog = document.createElement('dialog')
    drawingDialog.style.border = 'none'
    drawingDialog.style.width = '100%'
    drawingDialog.style.height = '100%'
    drawingDialog.style.position = 'fixed'
    drawingDialog.style.top = '0'
    drawingDialog.style.right = '0'
    drawingDialog.style.bottom = '0'
    drawingDialog.style.left = '0'
    drawingDialog.style.margin = '0'
    drawingDialog.style.justifyItems = 'center'
    drawingDialog.style.padding = '0'
    drawingDialog.style.overscrollBehavior = 'contain'
    drawingDialog.style.zIndex = '999'
    drawingDialog.style.color = 'inherit'
    drawingDialog.style.overflowY = 'hidden'
    drawingDialog.style.display = 'grid'
    drawingDialog.style.opacity = '0'

    drawingDialog.appendChild(drawingPage)

    return drawingDialog
}

function makeDrawUrl(baseUrl: string): string {
    return baseUrl + SmartTool.httpBuildQuery({
        // dev: isDebug ? 1 : 0,
        // 开启嵌入模式，能通过postMessage通信
        embed: 1,
        dark: 'auto',
        // protocol=json means we are using the JSON protocol for message passing
        proto: 'json',
        lang: 'zh',
        // 加载完成后，drawio发出configure事件等待父容器将配置传递给它
        configure: 1,
        ui: 'min',
        noSaveBtn: 0,
        noExitBtn: 1,
        saveAndExit: 0,
        // 形状面板最下面是否显示 导入图库
        // Specifies whether libraries should be enabled in embed mode. The default is disabled (0).
        libraries: 1,
        // stealth=1: Disables all features that require external web services (such as PDF export).
        // 实验：设为1后，更多图形里不显示图片
        stealth: 0,
        // 格式-绘图-数学排版
        math: 0,
        // 右侧的格式栏
        // 实验：ui=min时，无论如何都会显示
        format: 0
    })
}

function getDrawIoLink(editor: Editor): string {
    return editor.options.extensions.find((extension: any) => extension.name === SmartImage.name)?.options.drawIoLink
}

export default {
    makeDrawDialog,
    makeDrawUrl,
    getDrawIoLink
}