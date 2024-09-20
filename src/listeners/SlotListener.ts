import Config from "../config/config"
import DomHelper from "../helper/DomHelper"
import PageMode from "../model/PageMode"
import Listener from "../contract/Listener"

let emoji = "👂 SlotListener"

export default class SlotListener implements Listener {
    public observer?: MutationObserver

    constructor() {
        this.setEditorContent = this.setEditorContent.bind(this)
    }

    start(pageMode: PageMode) {
        let verbose = false

        if (!pageMode.isSlot()) {
            this.clearContent()
            return
        }

        if (verbose) {
            console.log(emoji, "初始化内容")
        }

        if (verbose) {
            console.log(emoji, "监听Slot内容")
        }

        this.observer = new MutationObserver(this.setEditorContent)
        this.observer.observe(this.getTarget(), this.getConfig())
        this.setEditorContent()
    }

    setEditorContent() {
        let verbose = false
        let content = this.getTarget().innerHTML

        if (verbose) {
            console.log(emoji, "got content", content.length == 0 ? "[empty]" : content.substring(0, 100))
        }

        window.api.node.setHTML(content)

        if (this.observer == null) {
            throw new Error("observer is null")
        }

        this.observer.disconnect()
        this.clearContent()
        this.observer.observe(this.getTarget(), this.getConfig())
    }

    getConfig() {
        return { childList: true, subtree: true, characterData: true }
    }

    getTarget() {
        return document.querySelector(Config.editorLabel)!
    }

    clearContent() {
        this.getTarget().innerHTML = ''
    }
}