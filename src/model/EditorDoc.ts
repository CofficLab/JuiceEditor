import { Editor, JSONContent } from '@tiptap/core'
import { HEADING } from '../config/nodes'
import { v4 as uuidv4 } from 'uuid'
import { DOC } from '../config/nodes'
import EditorData from './EditorData'

const emoji = '🍉 EditorDoc'

// 从编辑器中能获得的数据
export default class EditorDoc {
    public uuid: string = ""
    public title: string = ""
    public content: string = ""
    public json: JSONContent = {}
    public characterCount: number = 0
    public wordCount: number = 0

    static makeDefaultDoc(): EditorDoc {
        let title = 'default' + Date.now()
        let content = '<h1>' + title + '</h1>'

        return new EditorDoc()
            .setUuid(uuidv4())
            .setTitle(title)
            .setContent(content)
            .setJson({
                type: DOC,
                content: []
            })
            .setCharacterCount(0)
            .setWordCount(0)
    }

    static fromBase64(base64: string): EditorDoc {
        let verbose = false

        if (verbose) {
            console.log(emoji, 'fromBase64', base64)
        }

        let object = JSON.parse(atob(base64))

        return EditorDoc.fromObject(object)
    }

    static fromObject(obj: { [key: string]: any }): EditorDoc {
        let verbose = false

        if (verbose) {
            console.log(emoji, 'fromObject', obj)
        }

        let uuid = obj['uuid'] as string
        var title = obj['title'] as string
        var content = obj['content'] as string
        var json = obj['json'] as any
        var characterCount = obj['characterCount'] as number
        var wordCount = obj['wordCount'] as number

        if (uuid == undefined) {
            throw new Error('uuid is undefined')
        }

        if (title == undefined) {
            console.warn(emoji, 'title is undefined', obj)
            title = ''
        }

        if (content == undefined) {
            console.warn(emoji, 'content is undefined', obj)
            content = ''
        }

        if (json == undefined) {
            console.warn(emoji, 'json is undefined', obj)
            json = {}
        }

        if (characterCount == undefined) {
            console.warn(emoji, 'characterCount is undefined', obj)
            characterCount = 0
        }

        if (wordCount == undefined) {
            console.warn(emoji, 'wordCount is undefined', obj)
            wordCount = 0
        }

        return new EditorDoc()
            .setUuid(uuid)
            .setTitle(title)
            .setContent(content)
            .setJson(json)
            .setCharacterCount(characterCount)
            .setWordCount(wordCount);
    }

    static fromEditor(editor: Editor): EditorDoc {
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

        return new EditorDoc()
            .setUuid(editor.options.injectNonce ?? "")
            .setTitle(title)
            .setContent(editor.getHTML())
            .setJson(editor.getJSON())
            .setCharacterCount(editor.storage.characterCount.characters())
            .setWordCount(editor.storage.characterCount.words())
    }

    toObject(): { [key: string]: any } {
        return {
            uuid: this.uuid,
            title: this.title,
            content: this.content,
            json: this.json,
            characterCount: this.characterCount,
            wordCount: this.wordCount
        }
    }

    toDictForWebKit(): { [key: string]: string } {
        let verbose = false

        if (verbose) {
            console.log(emoji, 'toDictForWebKit', this)
        }

        return {
            uuid: this.uuid,
            title: this.title,
            content: this.content,
            json: JSON.stringify(this.json),
            characterCount: this.characterCount.toString(),
            wordCount: this.wordCount.toString()
        }
    }

    setUuid(uuid: string): this {
        this.uuid = uuid
        return this
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

    updateFromEditorData(data: EditorData): this {
        this.setContent(data.content)
        this.setTitle(data.title)
        this.setJson(data.json)
        this.setCharacterCount(data.characterCount)
        this.setWordCount(data.wordCount)

        return this
    }
}