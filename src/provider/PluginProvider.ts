import TreeNode from "../model/TreeNode";
import Plugin from "../contract/Plugin";
import EditorDoc from "../model/EditorDoc";
const emoji = "🐶 PluginProvider"

export default class PluginProvider {
    public plugins: Plugin[] = [];

    constructor(plugins: Plugin[]) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "初始化插件，个数", plugins.length)
        }

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
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnMessage", message)
        }

        this.plugins.forEach(p => {
            p.onMessage(message)
        })
    }

    onDocUpdated(doc: EditorDoc) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnDocUpdated")
        }

        this.plugins.forEach(p => {
            p.onDocUpdated(doc)
        })
    }

    onDocUpdatedWithNode(doc: EditorDoc, node: TreeNode) {
        let verbose = true

        if (verbose) {
            console.log(emoji, "OnDocUpdatedWithNode", doc, node)
        }

        this.plugins.forEach(p => {
            p.onDocUpdatedWithNode(doc, node)
        })
    }

    onDocsUpdated(docs: EditorDoc[]) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnDocsUpdated")
        }

        this.plugins.forEach(p => {
            p.onDocsUpdated(docs)
        })
    }
}