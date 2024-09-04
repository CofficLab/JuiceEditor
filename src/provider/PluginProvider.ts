import TreeNode from "../model/TreeNode";
import Plugin from "../contract/Plugin";
import EditorDoc from "../model/EditorDoc";
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

    onReady(mode: PageMode) {
        let verbose = true

        if (verbose) {
            console.log(emoji, "OnReady", mode.type)
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

    onDocUpdated(doc: EditorDoc | null) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnDocUpdated")
        }

        if (doc == null) {
            throw new Error("doc is null, this should not happen")
        }

        this.plugins.forEach(p => {
            p.onDocUpdated(doc)
        })
    }

    onDocUpdatedWithNode(doc: EditorDoc | null, node: TreeNode | null) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "OnDocUpdatedWithNode", doc, node)
        }

        if (doc == null) {
            throw new Error("doc is null, this should not happen")
        }

        if (node == null) {
            throw new Error("node is null, this should not happen")
        }

        this.plugins.forEach(p => {
            p.onDocUpdatedWithNode(doc, node)
        })
    }

    onDocsUpdated(docs: EditorDoc[] | null) {
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