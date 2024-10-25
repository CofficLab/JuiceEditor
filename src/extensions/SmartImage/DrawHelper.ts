import SmartTool from "../../helper/SmartTool";

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

export default {
    makeDrawUrl,
}