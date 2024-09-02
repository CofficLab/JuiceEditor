import Plugin from "src/contract/Plugin";
import Config from "../config/config";
import { Store } from "pinia";
import FeatureApi from "../api/FeatureApi";
import NodeApi from "../api/NodeApi";
import DocApi from "../api/DocApi";
import { FeatureStore } from "../store/FeatureStore";
import { AppStore } from "../store/AppStore";
import { DocStore } from "../store/DocStore";
import { NodeStore } from "../store/NodeStore";

const emoji = "🐶 ApiProvider"

export interface AllApi {
    feature: FeatureApi
    node: NodeApi
    doc: DocApi
}

export default class ApiProvider {
    public feature: FeatureApi
    public node: NodeApi
    public doc: DocApi

    constructor(appProvider: AppStore, featureProvider: FeatureStore, editorProvider: DocStore, nodeProvider: NodeStore) {
        let verbose = false

        if (verbose) {
            console.log(emoji, '初始化')
        }

        this.feature = new FeatureApi(featureProvider)
        this.node = new NodeApi(nodeProvider)
        this.doc = new DocApi(editorProvider)
    }

    boot() {
        window.api = {
            feature: this.feature,
            node: this.node,
            doc: this.doc
        }
    }
}