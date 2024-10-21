import TreeNode from "../model/TreeNode";
import Plugin from "../contract/Plugin";
import EditorData from "../model/EditorData";
import PageMode from "../model/PageMode";

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

    onLoading(reason: string) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnLoading", reason)
        }

        this.plugins.forEach(p => {
            p.onLoading(reason)
        })
    }

    onConfigChanged() {
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnConfigChanged")
        }

        this.plugins.forEach(p => {
            p.onConfigChanged()
        })
    }

    onReady(mode: PageMode) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnReady", mode.type)
        }

        this.plugins.forEach(p => {
            p.onReady()
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

    onDocUpdated(doc: EditorData | null) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnDocUpdated")
        }

        this.plugins.forEach(p => {
            p.onDocUpdated(doc)
        })
    }

    onDocUpdatedWithNode(doc: EditorData | null, node: TreeNode | null) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnDocUpdatedWithNode", doc, node)
        }

        if (node == null) {
            throw new Error("node is null, this should not happen")
        }

        this.plugins.forEach(p => {
            p.onDocUpdatedWithNode(doc, node)
        })
    }

    onDocsUpdated(docs: EditorData[] | null) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnDocsUpdated")
        }

        if (docs == null) {
            throw new Error("docs is null, this should not happen")
        }

        this.plugins.forEach(p => {
            p.onDocsUpdated(docs)
        })
    }

    onCurrentDocUUIDUpdated(uuid: string) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnCurrentDocUUIDUpdated", uuid)
        }

        this.plugins.forEach(p => {
            p.onCurrentDocUUIDUpdated(uuid)
        })
    }
}