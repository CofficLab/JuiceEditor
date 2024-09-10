import FeatureApi from "../api/FeatureApi";
import NodeApi from "../api/NodeApi";
import DocApi from "../api/DocApi";
import { FeatureStore } from "../store/FeatureStore";
import { DocStore } from "../store/DocStore";
import { NodeStore } from "../store/NodeStore";
import DocsApi from "../api/DocsApi";
import { DocsStore } from "../store/DocsStore";
import ModeApi from "../api/ModeApi";
import { ModeStore } from "../store/ModeStore";
import { RequestStore } from "../store/RequestStore";
import RequestApi from "../api/RequestApi";
const emoji = "🐶 ApiProvider"

export interface AllApi {
    feature: FeatureApi
    node: NodeApi
    doc: DocApi
    docs: DocsApi
    mode: ModeApi
    request: RequestApi
}

export interface ApiProviderParams {
    featureProvider: FeatureStore
    editorProvider: DocStore
    nodeProvider: NodeStore
    docsProvider: DocsStore
    modeProvider: ModeStore
    requestProvider: RequestStore
}

export default class ApiProvider {
    public feature: FeatureApi
    public node: NodeApi
    public doc: DocApi
    public docs: DocsApi
    public mode: ModeApi
    public request: RequestApi
    constructor(params: ApiProviderParams) {
        let verbose = false
        if (verbose) {
            console.log(emoji, '初始化')
        }

        this.feature = new FeatureApi(params.featureProvider)
        this.node = new NodeApi(params.nodeProvider)
        this.doc = new DocApi(params.editorProvider, params.requestProvider)
        this.docs = new DocsApi(params.docsProvider)
        this.mode = new ModeApi(params.modeProvider)
        this.request = new RequestApi(params.requestProvider)
    }

    boot() {
        window.api = {
            feature: this.feature,
            node: this.node,
            doc: this.doc,
            docs: this.docs,
            mode: this.mode,
            request: this.request
        }
    }
}