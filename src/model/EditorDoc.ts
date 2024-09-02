import { Editor, JSONContent } from '@tiptap/core'
import { HEADING } from '../config/nodes'
import { v4 as uuidv4 } from 'uuid'

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
            .setJson({})
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

        return new EditorDoc()
            .setUuid(obj['uuid'] as string)
            .setTitle(obj['title'] as string)
            .setContent(obj['content'] as string)
            .setJson(obj['json'] as any) // 假设setJson可以接受任意类型的JSON对象
            .setCharacterCount(obj['characterCount'] as number)
            .setWordCount(obj['wordCount'] as number);
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
}