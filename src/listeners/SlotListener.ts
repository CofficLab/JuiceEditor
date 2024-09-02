import Config from "../config/config"
import DomHelper from "../helper/DomHelper"

let emoji = "👂 SlotListener"

export default class SlotListener {
    public observer?: MutationObserver

    start() {
        let verbose = false

        if (verbose) {
            console.log(emoji, "监听Slot内容")
        }

        this.observer = new MutationObserver(this.setEditorContent)
        this.observer.observe(this.getTarget(), this.getConfig())
    }

    setEditorContent() {
        let content = document.querySelector(Config.editorLabel)!.innerHTML
        window.api.node.setContent(content)

        if (this.observer == null) {
            return
        }

        this.observer.disconnect()
        this.getTarget().innerHTML = ''
        this.observer.observe(this.getTarget(), this.getConfig())
    }

    getConfig() {
        return { childList: true, subtree: true, characterData: true }
    }

    getTarget() {
        return document.querySelector(Config.editorLabel)!
    }
}