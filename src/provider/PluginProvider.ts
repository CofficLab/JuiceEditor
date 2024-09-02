import Plugin from "src/contract/Plugin";

const emoji = "🐶 PluginProvider"

export default class PluginProvider {
    public plugins: Plugin[] = [];

    constructor(plugins: Plugin[]) {
        console.log(emoji, "初始化插件，个数", plugins.length)
        this.plugins = plugins
    }

    onReadyChange() {
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnReadyChange")
        }

        this.plugins.forEach(p => {
            p.onPageLoaded()
        })
    }

    onMessage(message: string) {
        console.log(emoji, "OnMessage")
        this.plugins.forEach(p => {
            p.onMessage(message)
        })
    }
}