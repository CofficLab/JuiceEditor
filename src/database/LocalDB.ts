import EditorDoc from "../model/EditorDoc";
import TreeNode from "../model/TreeNode";

let title = "🔋 LocalStore"

export default class LocalDB {
    static saveTreeNode(node: TreeNode): void {
        localStorage.setItem('tree_node', node.toJSONString())
    }

    static saveDocs(docs: EditorDoc[]): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'saveDocs', docs)
        }

        docs.forEach((doc: EditorDoc) => {
            if (doc.uuid.length == 0) {
                throw new Error('uuid is empty')
            }
        })

        localStorage.setItem('docs', JSON.stringify(docs))
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

    static getDocs(): EditorDoc[] | null {
        let verbose = false
        let saveData = localStorage.getItem('docs')

        if (verbose) {
            console.log(title, 'getDocs', saveData)
        }

        if (!saveData) {
            return null
        }

        let docs = JSON.parse(saveData).map((doc: { [key: string]: any; }) => EditorDoc.fromObject(doc))

        if (verbose) {
            console.log(title, 'getDoc', docs)
        }

        return docs
    }

    static saveCurrentDocUUID(uuid: string): void {
        localStorage.setItem('current_doc_uuid', uuid)
    }

    static getCurrentDocUUID(): string {
        return localStorage.getItem('current_doc_uuid') || ""
    }
}