import TreeNode from '../model/TreeNode';
import ApiBase from './ApiBase';
import { NodeStore } from '../store/NodeStore';

let title = "💻 NodeAPI"


export default class NodeApi extends ApiBase {
    public nodeStore: NodeStore

    constructor(nodeStore: NodeStore) { // 更新构造函数参数类型
        super();
        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.nodeStore = nodeStore
    }

    public setChildrenBase64(childrenBase64: string) {
        let objects = this.getBase64ObjectArray(childrenBase64)

        let node = this.nodeStore.node

        this.nodeStore.setNode(node.setChildren(objects.map((obj: any) => new TreeNode(obj))))
    }

    public setNodeAndChildren(node: TreeNode, children: TreeNode[]) {
        this.nodeStore.setNode(node.setChildren(children))
    }

    public setNodeBase64(treeNodeInBase64: string) {
        let node = new TreeNode(this.getBase64Object(treeNodeInBase64))
        this.nodeStore.setNode(node)
    }
}