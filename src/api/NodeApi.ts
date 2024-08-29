import { Store } from 'pinia';
import TreeNode from '../model/TreeNode';
import EditorDoc from '../model/EditorDoc';
import UpdateData from '../model/UpdateData';
import LocalDB from '../database/LocalDB';

let title = "🍎 NodeAPI"

export default class NodeApi {
    public app: Store<any, any, any, any>

    constructor(appProvider: Store<any, any, any, any>) {
        console.log(title, '初始化')
        this.app = appProvider
    }

    public setContent(content: string) {
        if (typeof content != 'string') {
            console.error(title, 'setContent', 'content is not string', content)
            return
        }

        let doc = this.app.getCurrentDoc()
        doc.content = content
        this.setDoc(doc)
    }

    public setDoc(doc: EditorDoc) {
        let verbose = false;
        if (verbose) {
            console.log(title, 'setDoc', doc)
        }

        if (this.app.getContent() == doc.content) {
            console.log(title, '更新节点，没变化，忽略')
            return
        }

        this.app.docs = this.app.docs.map((element: EditorDoc) => {
            if (element.uuid == doc.uuid) {
                return doc
            } else {
                return element
            }
        })

        if (!this.app.docs.find((element: EditorDoc) => element.uuid == doc.uuid)) {
            this.app.docs.push(doc)
            this.app.currentDocUUID = doc.uuid
        }

        let updateData = UpdateData.fromNodeAndDoc(this.app.node, doc)

        // console.log(title, '更新节点', JSON.stringify(updateData.toObject()))
        // webkit.debugMessage('更新节点' + JSON.stringify(updateData.toObject()))
        // console.log(title, 'node', this.node)
        // console.log(title, 'doc', doc)
        // console.log(title, 'updateData', updateData)

        LocalDB.saveTreeNode(this.app.node)
        LocalDB.saveDocs(this.app.docs)
    }

    public setNodeAndDocs(node: TreeNode, docs: EditorDoc[]) {
        this.app.setNodeAndDocs(node, docs)
    }

    public setNodeBase64(treeNodeInBase64: string) {
        let node = new TreeNode(JSON.parse(atob(treeNodeInBase64)))
        this.app.setNode(node)
    }
}