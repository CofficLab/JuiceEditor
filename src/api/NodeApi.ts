import { Store } from 'pinia';
import TreeNode from '../model/TreeNode';
import EditorDoc from '../model/EditorDoc';
import ApiBase from './ApiBase';

let title = "🍎 NodeAPI"

export default class NodeApi extends ApiBase {
    public app: Store<any, any, any, any>

    constructor(appProvider: Store<any, any, any, any>) {
        super();
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

    public setDrawLink(link: string) {
        this.app.setDrawLink(link)
    }

    public setDoc(doc: EditorDoc) {
        this.app.setDoc(doc)
    }

    public setDocs(docs: EditorDoc[]) {
        this.app.setDocs(docs)
    }

    public setNodeAndDocs(node: TreeNode, docs: EditorDoc[]) {
        docs.forEach((doc: EditorDoc) => {
            if (doc.uuid.length == 0) {
                throw new Error('doc uuid is empty')
            }
        })

        this.app.setNode(node)

        // 如果docs中没有doc active，则设置第一个doc为active
        if (!docs.find((doc: EditorDoc) => {
            return doc.active
        })) {
            docs[0].active = true
        }

        this.app.setDocs(docs)
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