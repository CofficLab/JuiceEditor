import { Store } from 'pinia';
import TreeNode from '../model/TreeNode';
import EditorDoc from '../model/EditorDoc';
import ApiBase from './ApiBase';
import UpdateData from '../model/UpdateData';

let title = "💻 NodeAPI"

export default class NodeApi extends ApiBase {
    public app: Store<any, any, any, any>

    constructor(appProvider: Store<any, any, any, any>) {
        super();

        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.app = appProvider
    }

    public setChildrenBase64(childrenBase64: string) {
        let objects = this.getBase64ObjectArray(childrenBase64)

        let node = this.app.node

        this.app.setNode(node.setChildren(objects.map((obj: any) => new TreeNode(obj))))
    }

    public setNodeAndChildren(node: TreeNode, children: TreeNode[]) {
        this.app.setNode(node.setChildren(children))
    }

    public setNodeBase64(treeNodeInBase64: string) {
        let node = new TreeNode(this.getBase64Object(treeNodeInBase64))
        this.app.setNode(node)
    }
}