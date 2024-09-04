import TreeNode from '../model/TreeNode';
import { NodeStore } from '../store/NodeStore';

let title = "💻 NodeAPI"


export default class NodeApi {
    public nodeStore: NodeStore

    constructor(nodeStore: NodeStore) {
        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.nodeStore = nodeStore
    }

    public setChildrenBase64(childrenBase64: string) {
        let node = this.nodeStore.node
        let objects = JSON.parse(atob(childrenBase64))

        this.nodeStore.setNode(node.setChildren(objects.map((obj: any) => new TreeNode(obj))))
    }

    public setNodeAndChildren(node: TreeNode, children: TreeNode[]) {
        this.nodeStore.setNode(node.setChildren(children))
    }

    public setNode(node: TreeNode) {
        this.nodeStore.setNode(node)
    }

    public setNodeBase64(treeNodeInBase64: string) {
        let node = TreeNode.fromBase64(treeNodeInBase64)
        this.nodeStore.setNode(node)
    }
}