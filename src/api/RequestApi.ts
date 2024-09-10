import { RequestStore } from '../store/RequestStore';

let title = "💻 RequestApi"

export default class FeatureApi {
    public requestProvider: RequestStore
    constructor(requestProvider: RequestStore) {
        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.requestProvider = requestProvider
    }

    setBaseURL(baseURL: string) {
        this.requestProvider.setBaseUrl(baseURL)
    }
}