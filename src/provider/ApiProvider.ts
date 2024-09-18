import FeatureApi from "../api/FeatureApi";
import DocApi from "../api/DocApi";
import { FeatureStore } from "../store/FeatureStore";
import { DocStore } from "../store/EditorStore";
import ModeApi from "../api/ModeApi";
import { ModeStore } from "../store/ModeStore";
import { RequestStore } from "../store/RequestStore";
import RequestApi from "../api/RequestApi";
const emoji = "🐶 ApiProvider"

export interface AllApi {
    feature: FeatureApi
    doc: DocApi
    mode: ModeApi
    request: RequestApi
}

export interface ApiProviderParams {
    featureProvider: FeatureStore
    editorProvider: DocStore
    modeProvider: ModeStore
    requestProvider: RequestStore
}

export default class ApiProvider {
    public feature: FeatureApi
    public doc: DocApi
    public mode: ModeApi
    public request: RequestApi

    constructor(params: ApiProviderParams) {
        let verbose = false
        if (verbose) {
            console.log(emoji, '初始化')
        }

        this.feature = new FeatureApi(params.featureProvider)
        this.doc = new DocApi(params.editorProvider, params.requestProvider)
        this.mode = new ModeApi(params.modeProvider)
        this.request = new RequestApi(params.requestProvider)
    }

    boot() {
        window.api = {
            feature: this.feature,
            doc: this.doc,
            mode: this.mode,
            request: this.request,
        }
    }
}