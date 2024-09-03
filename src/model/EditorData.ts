import { Editor, JSONContent } from '@tiptap/core'
import { HEADING } from '../config/nodes'
import { v4 as uuidv4 } from 'uuid'
import { DOC } from '../config/nodes'

const emoji = '🍉 EditorDoc'

// 从编辑器中能获得的数据
export default class EditorData {
    public title: string = ""
    public content: string = ""
    public json: JSONContent = {}
    public characterCount: number = 0
    public wordCount: number = 0

    static fromEditor(editor: Editor): EditorData {
        let verbose = false

        if (verbose) {
            console.log(emoji, 'fromEditor', editor.getJSON())
        }

        let nodes = editor.state.doc.content
        let title = ''
        nodes.forEach((node) => {
            if ([HEADING].includes(node.type.name) && title == '') {
                title = node.textContent!
            }
        })

        return new EditorData()
            .setTitle(title)
            .setContent(editor.getHTML())
            .setJson(editor.getJSON())
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