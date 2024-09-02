const emoji = "🐶 ListenerProvider"

export default class ListenerProvider {
    public items: Listener[] = [];

    constructor(items: Listener[]) {
        let verbose = false

        if (verbose) {
            console.log(emoji, "初始化Listener，个数", items.length)
        }

        this.items = items
    }

    boot() {
        this.items.forEach(l => l.start())
    }
}