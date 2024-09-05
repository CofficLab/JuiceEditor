import { Editor, JSONContent } from '@tiptap/core'
import { DOC } from '../config/nodes'

const emoji = '🍉 EditorBlock'

export default class EditorBlock {
    public type: string = ""
    public attrs: { [key: string]: any } | undefined = undefined
    public children: EditorBlock[] | undefined = undefined
    public text: string | undefined

    static emptyDocBlock(): EditorBlock {
        return new EditorBlock()
            .setType(DOC)
            .setAttrs({})
            .setChildren([])
    }

    static fromEditor(editor: Editor): EditorBlock {
        let verbose = false

        if (verbose) {
            console.log(emoji, 'fromEditor', editor.getJSON())
        }

        // {"type":"doc","content":[{"type":"heading","attrs":{"textAlign":"left","uuid":"63346510-ecc6-421c-9eac-15259ff5f9d2","level":1}}]}
        let json: JSONContent = editor.getJSON()
        let block = new EditorBlock()

        block.type = json.type ?? ""
        block.attrs = json.attrs ?? {}

        if (block.type != DOC) {
            throw new Error('EditorBlock.fromEditor: block.type is not DOC')
        }

        if (json.content) {
            block.children = json.content.map((block) => EditorBlock.fromJSONContent(block))
        }

        return block
    }

    /* 
        {
            "type":"heading",
            "attrs":{
                "textAlign":"left",
                "uuid":"63346510-ecc6-421c-9eac-15259ff5f9d2",
                "level":1
            }
        }
    */
    static fromJSONContent(json: JSONContent): EditorBlock {
        let verbose = false

        if (verbose) {
            console.log(emoji, 'fromJSONContent', json)
        }

        let block = new EditorBlock()

        if (json.type !== undefined) {
            block.type = json.type
        }

        if (block.type.length == 0) {
            console.log(emoji, 'fromJSONContent: block.type is empty', json)
            throw new Error('EditorBlock.fromJSONContent: block.type is empty')
        }

        if (json.text !== undefined) {
            block.text = json.text
        }

        if (json.attrs !== undefined) {
            block.attrs = json.attrs
        }

        if (json.content) {
            block.children = json.content.map((block) => EditorBlock.fromJSONContent(block))
        }

        return block
    }

    getUUID(): string | undefined {
        return this.attrs?.uuid
    }

    setUUID(uuid: string): this {
        if (!this.attrs) {
            this.attrs = {};
        }
        this.attrs.uuid = uuid;
        return this;
    }

    setType(type: string): this {
        this.type = type
        return this
    }

    setAttrs(attrs: { [key: string]: any }): this {
        this.attrs = attrs
        return this
    }

    setChildren(children: EditorBlock[]): this {
        this.children = children
        return this
    }
}