import Config from "../config/config"
import DomHelper from "../helper/DomHelper"
import PageMode from "../model/PageMode"
import Listener from "../contract/Listener"

let emoji = "👂 SlotListener"

export default class SlotListener implements Listener {
    public observer?: MutationObserver

    start(pageMode: PageMode) {
        let verbose = true

        if (!pageMode.isSlot()) {
            return
        }

        if (verbose) {
            console.log(emoji, "初始化内容")
        }

        this.setEditorContent()

        if (verbose) {
            console.log(emoji, "监听Slot内容")
        }

        this.observer = new MutationObserver(this.setEditorContent)
        this.observer.observe(this.getTarget(), this.getConfig())
    }

    setEditorContent() {
        let verbose = false
        let content = document.querySelector(Config.editorLabel)!.innerHTML

        if (verbose) {
            console.log(emoji, "got content", content.length == 0 ? "[empty]" : content.substring(0, 100))
        }

        window.api.doc.setHTML(content)

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