import { Store } from 'pinia';

let title = "💻 FeatureApi"

export default class FeatureApi {
    public featureProvider: Store<any, any, any, any>
    constructor(featureProvider: Store<any, any, any, any>) {
        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.featureProvider = featureProvider
    }

    enableFloatingMenu() {
        this.featureProvider.enableFloatingMenu()
    }

    enableEdit() {
        this.featureProvider.enableEdit()
    }

    showEditor() {
        this.featureProvider.showEditor()
    }

    hideEditor() {
        this.featureProvider.hideEditor()
    }
}