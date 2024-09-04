import EditorDoc from '../model/EditorDoc';
import { DocStore } from '../store/DocStore';

let title = "💻 DocApi"

export default class DocApi {
    public store: DocStore

    constructor(editorProvider: DocStore) {
        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.store = editorProvider
    }

    public setHTML(html: string) {
        if (typeof html != 'string') {
            console.error(title, 'setHTML', 'html is not string', html)
            return
        }

        let doc = this.store.getDoc()

        if (doc == null) {
            throw new Error('doc is null')
        }

        doc.html = html
        this.setDoc(doc)
    }

    public setDrawLink(link: string) {
        this.store.setDrawLink(link)
    }

    public setDoc(doc: EditorDoc) {
        this.store.setDoc(doc)
    }

    public setDocBase64(base64: string) {
        this.setDoc(EditorDoc.fromBase64(base64))
    }
}