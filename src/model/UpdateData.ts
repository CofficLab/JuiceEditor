import { Editor, JSONContent } from '@tiptap/core'
import TreeNode from './TreeNode'
import EditorDoc from './EditorDoc'

// 当编辑器更新时，对外发送的数据
export default class UpdateData {
    public nodeUUID: string = ""
    public docUUID: string = ""
    public content: string = ""
    public title: string = ""
    public json: JSONContent = {}
    public characterCount: number = 0
    public wordCount: number = 0

    static fromNodeAndDoc(node: TreeNode, doc: EditorDoc): UpdateData {
        return new UpdateData()
            .setNodeUUID(node.uuid)
            .setDocUUID(doc.uuid)
            .setContent(node.content)
            .setTitle(node.title)
            .setJson(node.jsonContent)
            .setCharacterCount(doc.characterCount)
            .setWordCount(doc.wordCount)
    }

    toObject(): object {
        console.log(this)
        return {
            channel: "updateNode",
            nodeUUID: this.nodeUUID,
            docUUID: this.docUUID,
            content: this.content,
            title: this.title,
            json: JSON.stringify(this.json),
        }
    }

    setNodeUUID(nodeUUID: string): this {
        this.nodeUUID = nodeUUID
        return this
    }

    setDocUUID(docUUID: string): this {
        this.docUUID = docUUID
        return this
    }

    setContent(content: string): this {
        this.content = content
        return this
    }

    setTitle(title: string): this {
        this.title = title
        return this
    }

    setJson(json: JSONContent): this {
        this.json = json
        return this
    }

    setCharacterCount(characterCount: number): this {
        this.characterCount = characterCount
        return this
    }

    setWordCount(wordCount: number): this {
        this.wordCount = wordCount
        return this
    }
}