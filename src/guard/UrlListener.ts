import Config from "../config/config"
import DomHelper from "../helper/DomHelper"

export default class UrlListener {
    start() {
        window.onpopstate = this.onURLChanged
    }

    private onURLChanged() {
        console.log('URL变化了', window.location.hash)
        let hash = window.location.hash
        if (hash) {
            DomHelper.goto(hash.substring(1), Config.editorLabel)
        }
    }
}