import EditorDoc from '../model/EditorDoc';
import { DocStore } from '../store/DocStore';
import DocRequest from '../request/DocRequest';
import { RequestStore } from '../store/RequestStore';

let title = "🔌 DocApi"

export default class DocApi {
    public store: DocStore
    public request: RequestStore

    constructor(editorProvider: DocStore, requestProvider: RequestStore) {
        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.store = editorProvider
        this.request = requestProvider
    }

    public setHTML(html: string) {
        let verbose = false

        if (verbose) {
            console.log(title, 'setHTML', html.length == 0 ? "[empty]" : html.substring(0, 100))
        }

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
        let verbose = true

        if (verbose) {
            console.log(title, 'setDoc', doc)
        }

        this.store.setDoc(doc)
    }

    public setDocNull() {
        this.store.setDoc(null)
    }

    public setDocEmpty() {
        this.setDoc(EditorDoc.default())
    }

    public setDocByRequest(id: string) {
        new DocRequest(this.request.getBaseUrl()).getDoc(id).then((doc) => {
            this.setDoc(doc)
        })
    }

    public setDocJSON(json: string) {
        this.setDoc(EditorDoc.fromJSONString(json))
    }

    public setDocBase64(base64: string) {
        this.store.setDoc(EditorDoc.fromBase64(base64))
    }

    public printJSON(json: string) {
        console.log(json)
    }
}