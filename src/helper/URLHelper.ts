import Helper from "./Helper"

class URLHelper {
    static onURLChanged() {
        console.log('URL变化了', window.location.hash)
        let hash = window.location.hash
        if (hash) {
            Helper.goto(hash.substring(1), 'juice-editor')
        }
    }
}

export default URLHelper