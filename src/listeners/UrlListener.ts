import Config from "../config/config"
import DomHelper from "../helper/DomHelper"
import Listener from "../contract/Listener"
import PageMode from "../model/PageMode"

export default class UrlListener implements Listener {
    start(pageMode: PageMode) {
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