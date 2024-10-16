import FeatureApi from "../api/FeatureApi";
import NodeApi from "../api/NodeApi";
import { FeatureStore } from "../store/FeatureStore";
import ModeApi from "../api/ModeApi";
import { ModeStore } from "../store/ModeStore";
import { RequestStore } from "../store/RequestStore";
import { ConfigStore } from "../store/ConfigStore";
import RequestApi from "../api/RequestApi";
import ConfigApi from "../api/ConfigApi";
import { Editor } from "@tiptap/core";
const emoji = "🐶 ApiProvider"

export interface AllApi {
    feature: FeatureApi
    node: NodeApi
    mode: ModeApi
    request: RequestApi
    config: ConfigApi
}

export interface ApiProviderParams {
    featureProvider: FeatureStore
    modeProvider: ModeStore
    requestProvider: RequestStore
    editor: Editor
    configProvider: ConfigStore
}

export default class ApiProvider {
    public feature: FeatureApi
    public node: NodeApi
    public mode: ModeApi
    public request: RequestApi
    public editor: Editor
    public config: ConfigApi
    constructor(params: ApiProviderParams) {
        let verbose = false
        if (verbose) {
            console.log(emoji, '初始化')
        }

        this.feature = new FeatureApi(params.featureProvider)
        this.node = new NodeApi(params.requestProvider, params.editor, params.configProvider)
        this.mode = new ModeApi(params.modeProvider)
        this.request = new RequestApi(params.requestProvider)
        this.editor = params.editor
        this.config = new ConfigApi(params.configProvider)
    }

    boot() {
        window.api = {
            feature: this.feature,
            node: this.node,
            mode: this.mode,
            request: this.request,
            config: this.config,
        }
    }
}