import EditorDoc from "./EditorDoc"
import TreeNode from "./TreeNode"

export default class Sample {
    public node: TreeNode
    public doc: EditorDoc

    constructor(node: TreeNode, doc: EditorDoc) {
        this.node = node
        this.doc = doc
    }
}