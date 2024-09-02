import Plugin from "src/contract/Plugin";
import Config from "../config/config";
import { Store } from "pinia";
import FeatureApi from "../api/FeatureApi";
import NodeApi from "../api/NodeApi";
import CoreApi from "../api/CoreApi";

const emoji = "🐶 ApiProvider"

export interface AllApi {
    feature: FeatureApi
    node: NodeApi
    core: CoreApi
}

export default class ApiProvider {
    public feature: FeatureApi
    public node: NodeApi
    public core: CoreApi

    constructor(featureProvider: Store<any, any, any, any>, appProvider: Store<any, any, any, any>, editorProvider: Store<any, any, any, any>) {
        console.log(emoji, '初始化')

        this.feature = new FeatureApi(featureProvider)
        this.node = new NodeApi(appProvider)
        this.core = new CoreApi(editorProvider)
    }

    boot() {
        window.api = {
            feature: this.feature,
            node: this.node,
            core: this.core
        }
    }
}