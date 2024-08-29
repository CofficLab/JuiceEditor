import { Store } from 'pinia';
import FeatureApi from './FeatureApi';
import NodeApi from './NodeApi';

let title = "🍎 Api"

export default class AllApi {
    public feature: FeatureApi
    public node: NodeApi

    constructor(featureProvider: Store<any, any, any, any>, appProvider: Store<any, any, any, any>) {
        console.log(title, '初始化')

        this.feature = new FeatureApi(featureProvider)
        this.node = new NodeApi(appProvider)
    }
}