import FeatureApi from "../api/FeatureApi";
import NodeApi from "../api/NodeApi";
import { FeatureStore } from "../store/FeatureStore";
import ModeApi from "../api/ModeApi";
import { ModeStore } from "../store/ModeStore";
import { RequestStore } from "../store/RequestStore";
import RequestApi from "../api/RequestApi";
import { Editor } from "@tiptap/vue-3";
const emoji = "🐶 ApiProvider"

export interface AllApi {
    feature: FeatureApi
    node: NodeApi
    mode: ModeApi
    request: RequestApi
}

export interface ApiProviderParams {
    featureProvider: FeatureStore
    modeProvider: ModeStore
    requestProvider: RequestStore
    editor: Editor
}

export default class ApiProvider {
    public feature: FeatureApi
    public node: NodeApi
    public mode: ModeApi
    public request: RequestApi
    public editor: Editor
    constructor(params: ApiProviderParams) {
        let verbose = false
        if (verbose) {
            console.log(emoji, '初始化')
        }

        this.feature = new FeatureApi(params.featureProvider)
        this.node = new NodeApi(params.requestProvider, params.editor)
        this.mode = new ModeApi(params.modeProvider)
        this.request = new RequestApi(params.requestProvider)
        this.editor = params.editor
    }

    boot() {
        window.api = {
            feature: this.feature,
            node: this.node,
            mode: this.mode,
            request: this.request,
        }
    }
}