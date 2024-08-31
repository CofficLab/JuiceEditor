import Config from "../config/config";

export default class EventProvider {
    static downloadImage(src: string, name: string) {
        Config.plugins.forEach(plugin => {
            plugin.onDownloadImage(src, name)
        })
    }
}