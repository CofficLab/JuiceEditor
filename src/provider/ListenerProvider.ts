const emoji = "🐶 ListenerProvider"
import Listener from "../contract/Listener"
import PageMode from "../model/PageMode"

export default class ListenerProvider {
    public items: Listener[] = [];

    constructor(items: Listener[]) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "初始化Listener，个数", items.length)
        }

        this.items = items
    }

    boot(pageMode: PageMode) {
        this.items.forEach(l => l.start(pageMode))
    }
}