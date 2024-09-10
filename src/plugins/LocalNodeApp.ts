import Plugin from "../contract/Plugin";
import TreeNode from "../model/TreeNode";
import EditorDoc from "../model/EditorDoc";
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
        let verbose = false

        const currentNode = LocalDB.getNode()
        const docs = LocalDB.getDocs()
        const currentDoc = LocalDB.getCurrentDoc() || EditorDoc.default()

        if (verbose) {
            console.log(title, 'onPageLoaded, set node and doc', currentNode.uuid, currentDoc.getUUID())
        }

        window.api.node.setNode(currentNode)
        window.api.doc.setDoc(currentDoc)
        window.api.docs.setDocs(docs || [])
    }

    onSelectionTypeChange(type: string): void {

    }

    onDocUpdatedWithNode(data: EditorDoc, node: TreeNode): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'onDocUpdatedWithNode', data, node)
        }

        LocalDB.saveNode(node)

        this.onDocUpdated(data)
    }

    onDocUpdated(data: EditorDoc): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'onDocUpdated', data)
        }

        var docs = LocalDB.getDocs()
        if (docs) {
            docs = docs.map(doc => {
                if (doc.getUUID() == data.getUUID()) {
                    return data
                }
                return doc
            })
        }

        if (!docs) {
            docs = []
        }

        LocalDB.saveDocs(docs)
    }

    onDocsUpdated(data: EditorDoc[]): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'onDocsUpdated', data.length)
        }

        LocalDB.saveDocs(data)
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
    static getCurrentDoc(): EditorDoc | undefined {
        let docs = LocalDB.getDocs()

        if (!docs) {
            return undefined
        }

        let currentDocUUID = LocalDB.getCurrentDocUUID()

        if (currentDocUUID.length == 0) {
            let firstDoc = docs[0]
            let uuid = firstDoc?.getUUID()

            if (!uuid) {
                throw new Error('uuid is empty')
            }

            if (firstDoc) {
                LocalDB.saveCurrentDocUUID(uuid)
            }

            return firstDoc
        }

        return docs.find(doc => doc.getUUID() == currentDocUUID)
    }

    static saveNode(node: TreeNode): void {
        localStorage.setItem('node', node.toJSONString())
    }

    static saveDocs(docs: EditorDoc[]): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'saveDocs', docs, docs.length)
        }

        docs.forEach((doc: EditorDoc) => {
            if (doc.getUUID() == undefined) {
                throw new Error('uuid is empty')
            }
        })

        localStorage.setItem('docs', JSON.stringify(docs))
    }

    static getNode(): TreeNode {
        let verbose = false
        let saveData = localStorage.getItem('node')
        let treeNode = saveData ? new TreeNode(JSON.parse(saveData)) : TreeNode.makeDefaultNode()

        if (verbose) {
            console.log(title, 'getNode', treeNode)
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

        let docs = JSON.parse(saveData).map((doc: { [key: string]: any; }) => EditorDoc.fromJSONString(JSON.stringify(doc)))

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

export default LocalNodeApp