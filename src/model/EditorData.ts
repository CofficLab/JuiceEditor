import { Editor, JSONContent } from '@tiptap/core'
import { HEADING } from '../config/nodes'
import { v4 as uuidv4 } from 'uuid'
import { DOC } from '../config/nodes'
import EditorBlock from './EditorBlock'
import EditorDoc from './EditorDoc'
const emoji = '🍉 EditorData'

// 从编辑器中能获得的数据
export default class EditorData {
    public title: string = ""
    public content: string = ""
    public jsonContent: JSONContent = {}
    public doc: EditorDoc = EditorDoc.default()
    public characterCount: number = 0
    public wordCount: number = 0

    static fromEditor(editor: Editor): EditorData {
        let verbose = false

        if (verbose) {
            console.log(emoji, 'fromEditor', editor.getJSON())
        }

        if (editor.options.injectNonce == undefined) {
            throw new Error('EditorData.fromEditor: injectNonce is undefined')
        }

        return new EditorData()
            .setTitle(this.getTitleFromEditor(editor))
            .setContent(editor.getHTML())
            .setDoc(EditorDoc.fromEditor(editor))
            .setCharacterCount(editor.storage.characterCount.characters())
            .setWordCount(editor.storage.characterCount.words())
    }

    setTitle(title: string): this {
        this.title = title
        return this
    }

    setContent(content: string): this {
        var newContent = content

        if (content == null || content == undefined) {
            newContent = ''
        }

        if (typeof newContent !== 'string') {
            throw new Error('EditorDoc.setContent: content must be a string, but got ' + newContent)
        }

        this.content = newContent
        return this
    }

    setDoc(doc: EditorDoc): this {
        this.doc = doc
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