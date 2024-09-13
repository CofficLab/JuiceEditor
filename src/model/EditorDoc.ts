import { Editor, JSONContent } from '@tiptap/core'
import { DOC, HEADING } from '../config/nodes'
import EditorBlock from './EditorBlock'
import UUIDHelper from '../helper/UUIDHelper'

const emoji = '🍉 EditorDoc'

// 从编辑器中能获得的数据
export default class EditorDoc extends EditorBlock {
    public title: string = ""
    public html: string = ""
    public wordCount: number = 0
    public characterCount: number = 0

    constructor(params?: object) {
        super()
        if (params) {
            Object.assign(this, params)
        }
    }

    static default(): EditorDoc {
        return new EditorDoc()
            .setType(DOC)
            .setAttrs({
                uuid: UUIDHelper.generate(),
            })
            .setChildren([])
    }

    static fromJSONString(jsonString: string): EditorDoc {
        let parsedJson: JSONContent

        try {
            parsedJson = JSON.parse(jsonString);
        } catch (e) {
            console.log(jsonString)
            console.log(emoji, 'fromJSONString', jsonString)
            console.error(emoji, 'fromJSONString', 'json parse error', e)
            throw e
        }

        if (parsedJson.type != DOC) {
            throw new Error('EditorDoc.fromJSONString: block.type is not DOC')
        }

        const doc = new EditorDoc()
            .setType(parsedJson.type)

        if (parsedJson.attrs) doc.setAttrs(parsedJson.attrs)
        if (parsedJson.title) doc.setTitle(parsedJson.title)
        if (parsedJson.html) doc.setHtml(parsedJson.html)
        if (parsedJson.wordCount) doc.setWordCount(parsedJson.wordCount)
        if (parsedJson.characterCount) doc.setCharacterCount(parsedJson.characterCount)

        // 确保 children 是 EditorBlock 实例
        if (Array.isArray(parsedJson.children)) {
            doc.children = parsedJson.children.map((child: JSONContent) => EditorBlock.fromJSONContent(child));
        }

        return doc;
    }

    static fromBase64(base64: string): EditorDoc {
        let verbose = true
        // 使用 decodeURIComponent 和 escape 解码 Base64 字符串
        const jsonString = decodeURIComponent(escape(atob(base64)));

        if (verbose) {
            console.log(emoji, 'base64 to json', jsonString)
        }

        return EditorDoc.fromJSONString(jsonString);
    }

    static fromEditor(editor: Editor): EditorDoc | Error {
        let verbose = false

        if (verbose) {
            console.log(emoji, 'fromEditor', editor.getJSON())
        }

        if (editor.options.injectNonce == undefined) {
            return new Error('EditorDoc.fromEditor: injectNonce is undefined')
        }

        // {"type":"doc","content":[{"type":"heading","attrs":{"textAlign":"left","uuid":"63346510-ecc6-421c-9eac-15259ff5f9d2","level":1}}]}
        let json: JSONContent = editor.getJSON()
        let doc = new EditorDoc()

        doc.type = json.type ?? ""
        doc.attrs = {
            uuid: editor.options.injectNonce,
        }
        doc.wordCount = editor.storage.characterCount.words()
        doc.characterCount = editor.storage.characterCount.characters()
        doc.html = editor.getHTML()
        doc.title = EditorDoc.getTitleFromEditor(editor)

        if (doc.type != DOC) {
            return new Error('EditorBlock.fromEditor: block.type is not DOC')
        }

        if (json.content) {
            doc.children = json.content.map((block) => EditorBlock.fromJSONContent(block))
        }

        return doc
    }

    toJSONString(): string {
        return JSON.stringify(this)
    }

    getDocUUID(): string {
        let uuid = this.getUUID()

        if (!uuid) {
            throw new Error('EditorDoc.getDocUUID: uuid is undefined')
        }

        return uuid
    }

    setTitle(title: string): this {
        this.title = title
        return this
    }

    setHtml(html: string): this {
        this.html = html
        return this
    }

    setWordCount(wordCount: number): this {
        this.wordCount = wordCount
        return this
    }

    setCharacterCount(characterCount: number): this {
        this.characterCount = characterCount
        return this
    }

    isEqual(doc: EditorDoc): boolean {
        return this.toJSONString() == doc.toJSONString()
    }

    hasSameHtmlAndTitle(doc: EditorDoc): boolean {
        return this.html == doc.html && this.title == doc.title
    }

    private static getTitleFromEditor(editor: Editor): string {
        let nodes = editor.state.doc.content
        let title = ''
        nodes.forEach((node) => {
            if ([HEADING].includes(node.type.name) && title == '') {
                title = node.textContent!
            }
        })
        return title
    }
}