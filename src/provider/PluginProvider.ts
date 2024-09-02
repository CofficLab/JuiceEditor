import Plugin from "../contract/Plugin";
import EditorDoc from "../model/EditorDoc";
const emoji = "🐶 PluginProvider"

export default class PluginProvider {
    public plugins: Plugin[] = [];

    constructor(plugins: Plugin[]) {
        console.log(emoji, "初始化插件，个数", plugins.length)
        this.plugins = plugins
    }

    onReadyChange() {
        let verbose = true

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

    onDocUpdated(doc: EditorDoc) {
        console.log(emoji, "OnDocUpdated")
        this.plugins.forEach(p => {
            p.onDocUpdated(doc)
        })
    }
}