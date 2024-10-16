import { ConfigStore } from '../store/ConfigStore';

let title = "🔧 ConfigApi"

export default class ConfigApi {
    public configProvider: ConfigStore
    constructor(configProvider: ConfigStore) {
        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.configProvider = configProvider
    }
}