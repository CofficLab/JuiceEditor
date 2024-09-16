import Plugin from "../contract/Plugin";
import TreeNode from "../model/TreeNode";
import EditorData from "../model/EditorData";
import ImageHelper from "../helper/ImageHelper";
import PageMode from "../model/PageMode";
const title = "🍎 LocalNodeApp"

class LocalNodeApp implements Plugin {
    forPages: PageMode[] = [PageMode.NODE]

    onDownloadImage(src: string, name: string): void {
        console.log(title, 'download image')

        if (src.startsWith('data:image/') || src.startsWith('data: image/')) {
            ImageHelper.downloadBase64(src)
        } else {
            ImageHelper.downloadImageFromUrl(src)
        }
    }

    onMessage(message: string): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'message', message)
        }
    }

    onPageLoaded(): void {
        let verbose = true

        const currentDoc = LocalDB.getDoc() || EditorData.default()

        if (verbose) {
            console.log(title, 'onPageLoaded, set doc')
        }

        window.api.doc.setHTML(currentDoc.html)
    }

    onSelectionTypeChange(type: string): void {

    }

    onDocUpdatedWithNode(data: EditorData, node: TreeNode): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'onDocUpdatedWithNode', data, node)
        }

        LocalDB.saveNode(node)

        this.onDocUpdated(data)
    }

    onDocUpdated(data: EditorData): void {
        let verbose = true

        if (verbose) {
            console.log(title, 'onDocUpdated', data)
        }

        LocalDB.saveDoc(data)
    }

    onDocsUpdated(data: EditorData[]): void {

    }

    onCurrentDocUUIDUpdated(uuid: string): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'onCurrentDocUUIDUpdated', uuid)
        }

        LocalDB.saveCurrentDocUUID(uuid)
    }
}

class LocalDB {
    static saveNode(node: TreeNode): void {
        localStorage.setItem('node', node.toJSONString())
    }

    static saveDoc(doc: EditorData): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'saveDoc', doc)
        }

        localStorage.setItem('doc', doc.toJSONString())
    }

    static getDoc(): EditorData | null {
        let verbose = false
        let saveData = localStorage.getItem('doc')
        let doc = saveData ? new EditorData(JSON.parse(saveData)) : EditorData.default()

        if (verbose) {
            console.log(title, 'getDoc', doc)
        }

        if (!saveData) {
            return null
        }

        return doc
    }

    static saveCurrentDocUUID(uuid: string): void {
        localStorage.setItem('current_doc_uuid', uuid)
    }

    static getCurrentDocUUID(): string {
        return localStorage.getItem('current_doc_uuid') || ""
    }
}

export default LocalNodeApp