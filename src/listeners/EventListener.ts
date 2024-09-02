import Config from "../config/config"
import DomHelper from "../helper/DomHelper"

let emoji = "👂 EventListener"

export default class EventListener {
    start() {
        let verbose = false

        if (verbose) {
            console.log(emoji, "监听浏览器事件")
        }
    }
}