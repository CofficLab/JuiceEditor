import { Store } from 'pinia';
import TreeNode from '../model/TreeNode';
import EditorDoc from '../model/EditorDoc';

import UpdateData from '../model/UpdateData';

let title = "💻 DocApi"

export default class DocApi {
    public editor: Store<any, any, any, any>

    constructor(editorProvider: Store<any, any, any, any>) {


        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.editor = editorProvider
    }

    public setContent(content: string) {
        if (typeof content != 'string') {
            console.error(title, 'setContent', 'content is not string', content)
            return
        }

        let doc = this.editor.getDoc()
        doc.content = content
        this.setDoc(doc)
    }

    public setDrawLink(link: string) {
        this.editor.setDrawLink(link)
    }

    public setDoc(doc: EditorDoc) {
        this.editor.setDoc(doc)
    }

    public setDocBase64(base64: string) {
        this.setDoc(EditorDoc.fromBase64(base64))
    }

    public setDocs(docs: EditorDoc[]) {
        this.editor.setDocs(docs)
    }
}