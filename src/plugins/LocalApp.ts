import UpdateData from "../model/UpdateData";
import Plugin from "../contract/Plugin";
import TreeNode from "../model/TreeNode";
import EditorDoc from "../model/EditorDoc";
import ImageHelper from "../helper/ImageHelper";

const title = "🍎 LocalApp"

class LocalApp implements Plugin {
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

        if (verbose) {
            console.log(title, 'onPageLoaded')
        }

        let docs = LocalDB.getDocs()

        if (docs) {
            if (verbose) {
                console.log(title, 'set docs from local db', docs)
            }

            // 如果docs中任意doc都不active，则active第一个
            if (!docs.find((doc: EditorDoc) => {
                return doc.active
            })) {
                docs[0].active = true
            }

            let firstActiveDoc = docs.find((doc: EditorDoc) => doc.active);
            if (firstActiveDoc) {
                if (verbose) {
                    console.log(title, 'first active doc', firstActiveDoc);
                }

            } else {
                throw new Error(title + 'no active doc found');
            }

            window.api.core.setDoc(firstActiveDoc)
            return
        }

        console.log(title, 'set docs to default', docs)

        window.api.core.setDoc(EditorDoc.makeDefaultDoc())
    }

    onSelectionTypeChange(type: string): void {

    }

    onUpdated(data: UpdateData): void {
        let verbose = false

        if (verbose) {
            console.log(title, data)
        }
    }

    onNodeUpdated(node: TreeNode): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'onNodeUpdated', node)
        }

        LocalDB.saveTreeNode(node)
    }

    onDocUpdated(data: EditorDoc): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'onDocUpdated', data)
        }

        LocalDB.saveDocs([data])
    }

    onCurrentDocUUIDChange(uuid: string): void {
        console.log(title, 'onCurrentDocUUIDChange', uuid)
        LocalDB.saveCurrentDocUUID(uuid)
    }
}

class LocalDB {
    static getCurrentDoc(): EditorDoc | undefined {
        let docs = LocalDB.getDocs()

        if (!docs) {
            return undefined
        }

        return docs.find((doc) => doc.active)
    }

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

export default LocalApp