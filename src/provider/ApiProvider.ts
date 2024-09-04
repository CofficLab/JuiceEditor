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

const emoji = "🐶 ApiProvider"

export interface AllApi {
    feature: FeatureApi
    node: NodeApi
    doc: DocApi
    docs: DocsApi
    mode: ModeApi
}

export interface ApiProviderParams {
    featureProvider: FeatureStore
    editorProvider: DocStore
    nodeProvider: NodeStore
    docsProvider: DocsStore
    modeProvider: ModeStore
}

export default class ApiProvider {
    public feature: FeatureApi
    public node: NodeApi
    public doc: DocApi
    public docs: DocsApi
    public mode: ModeApi
    constructor(params: ApiProviderParams) {
        let verbose = false
        if (verbose) {
            console.log(emoji, '初始化')
        }

        this.feature = new FeatureApi(params.featureProvider)
        this.node = new NodeApi(params.nodeProvider)
        this.doc = new DocApi(params.editorProvider)
        this.docs = new DocsApi(params.docsProvider)
        this.mode = new ModeApi(params.modeProvider)
    }

    boot() {
        window.api = {
            feature: this.feature,
            node: this.node,
            doc: this.doc,
            docs: this.docs,
            mode: this.mode
        }
    }
}