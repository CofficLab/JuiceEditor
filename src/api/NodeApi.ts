import { Store } from 'pinia';
import TreeNode from '../model/TreeNode';
import EditorDoc from '../model/EditorDoc';
import UpdateData from '../model/UpdateData';

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
        this.app.setDoc(doc)
    }

    public setDocs(docs: EditorDoc[]) {
        this.app.setDocs(docs)
    }

    public setNodeAndDocs(node: TreeNode, docs: EditorDoc[]) {
        this.app.setNodeAndDocs(node, docs)
    }

    public setNodeBase64(treeNodeInBase64: string) {
        let node = new TreeNode(JSON.parse(atob(treeNodeInBase64)))
        this.app.setNode(node)
    }
}