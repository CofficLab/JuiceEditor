import Config from "../config/config"
import DomHelper from "../helper/DomHelper"
import Listener from "../contract/Listener"
import PageMode from "../model/PageMode"
let emoji = "👂 EventListener"

export default class EventListener implements Listener {
    start(pageMode: PageMode) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "监听浏览器事件")
        }
    }
}