import EditorDoc from "../model/EditorDoc";
import TreeNode from "../model/TreeNode";

let title = "🔋 LocalStore"

export default class LocalStore {
    static saveTreeNode(node: TreeNode): void {
        localStorage.setItem('tree_node', node.toJSONString())
    }

    static getTreeNode(): TreeNode {
        let verbose = false
        let saveData = localStorage.getItem('tree_node')
        let treeNode = saveData ? new TreeNode(JSON.parse(saveData)) : TreeNode.makeDefaultNode()

        if (verbose) {
            console.log(title, 'getTreeNode', treeNode)
        }

        return treeNode
    }
}