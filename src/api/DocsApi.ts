import { Store } from 'pinia';
import TreeNode from '../model/TreeNode';
import EditorDoc from '../model/EditorDoc';

import UpdateData from '../model/UpdateData';
import { DocsStore } from '../store/DocsStore';

let title = "💻 DocsApi"

export default class DocsApi {
    public editor: DocsStore

    constructor(docsProvider: DocsStore) {


        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.editor = docsProvider
    }

    public setDocs(docs: EditorDoc[]) {
        this.editor.setDocs(docs)
    }

    public setDocsBase64(base64: string) {
        let objects = JSON.parse(atob(base64))
        this.setDocs(objects.map((obj: any) => EditorDoc.fromObject(obj)))
    }
}