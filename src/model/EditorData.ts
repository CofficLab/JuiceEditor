import { Editor, JSONContent } from '@tiptap/core'
import { DOC, HEADING } from '../config/nodes'
import TiptapHelper from '../helper/TiptapHelper'
import { Root } from '../extensions/Root/Root'

const emoji = '🍉 EditorDoc'

// 从编辑器中能获得的数据
export default class EditorData {
    public title: string = ""
    public html: string = `<div data-type="root" data-uuid="default-root"></div>`
    public nodes: JSONContent[] = []
    public wordCount: number = 0
    public characterCount: number = 0

    constructor(params?: object) {
        if (params) {
            Object.assign(this, params)
        }
    }

    static default(): EditorData {
        return new EditorData()
    }

    static fromEditor(editor: Editor): EditorData | Error {
        let verbose = false

        if (verbose) {
            console.log(emoji, 'fromEditor', editor.getJSON())
        }

        if (editor.options.injectNonce == undefined) {
            return new Error('EditorDoc.fromEditor: injectNonce is undefined')
        }

        let doc = new EditorData()

        doc.wordCount = editor.storage.characterCount.words()
        doc.characterCount = editor.storage.characterCount.characters()
        doc.html = editor.getHTML()
        doc.nodes = TiptapHelper.flattenBlock(editor.getJSON()).map(node => {
            if (node.type == Root.name) {
                node.html = doc.html
            }
            return node
        })
        doc.title = EditorData.getTitleFromEditor(editor)

        return doc
    }

    toJSONString(): string {
        return JSON.stringify(this)
    }

    setTitle(title: string): this {
        this.title = title
        return this
    }

    setHtml(html: string): this {
        this.html = html
        return this
    }

    setNodes(nodes: JSONContent[]): this {
        this.nodes = nodes
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

    isEqual(doc: EditorData): boolean {
        return this.toJSONString() == doc.toJSONString()
    }

    hasSameHtmlAndTitle(doc: EditorData): boolean {
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