import { Editor, JSONContent } from '@tiptap/core'
import { HEADING } from '../config/nodes'
import { v4 as uuidv4 } from 'uuid'
import { DOC } from '../config/nodes'

const emoji = '🍉 EditorBlock'

export default class EditorBlock {
    public type: string = ""
    public attributes: { [key: string]: any } = {}
    public children: EditorBlock[] = []

    static emptyDocBlock(): EditorBlock {
        return new EditorBlock()
            .setType(DOC)
            .setAttributes({})
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
        block.attributes = json.attrs ?? {}

        if (block.type != DOC) {
            throw new Error('EditorBlock.fromEditor: block.type is not DOC')
        }

        if (json.content) {
            block.children = json.content.map((block) => EditorBlock.fromJSONContent(block))
        }
        return block
    }

    // {"type":"heading","attrs":{"textAlign":"left","uuid":"63346510-ecc6-421c-9eac-15259ff5f9d2","level":1}}
    static fromJSONContent(json: JSONContent): EditorBlock {
        let block = new EditorBlock()
        block.type = json.type ?? ""
        block.attributes = json.attrs ?? {}

        if (json.content) {
            block.children = json.content.map((block) => EditorBlock.fromJSONContent(block))
        }
        return block
    }

    getUUID(): string {
        return this.attributes.uuid ?? ""
    }

    setType(type: string): this {
        this.type = type
        return this
    }

    setAttributes(attributes: { [key: string]: any }): this {
        this.attributes = attributes
        return this
    }

    setChildren(children: EditorBlock[]): this {
        this.children = children
        return this
    }
}