import { Editor, JSONContent } from '@tiptap/core'
import { v4 as uuidv4 } from 'uuid'

// 从编辑器中能获得的数据
export default class EditorDoc {
    public uuid: string = ""
    public title: string = ""
    public content: string = ""
    public json: JSONContent = {}
    public characterCount: number = 0
    public wordCount: number = 0

    static makeDefaultDoc(): EditorDoc {
        console.log("makeDefaultDoc")
        return new EditorDoc()
            .setUuid(uuidv4())
            .setTitle('')
            .setContent('<h1>Default Title</h1>')
            .setJson({})
            .setCharacterCount(0)
            .setWordCount(0)
    }

    static fromObject(obj: { [key: string]: any }): EditorDoc {
        return new EditorDoc()
            .setUuid(obj['uuid'] as string)
            .setTitle(obj['title'] as string)
            .setContent(obj['content'] as string)
            .setJson(obj['json'] as any) // 假设setJson可以接受任意类型的JSON对象
            .setCharacterCount(obj['characterCount'] as number)
            .setWordCount(obj['wordCount'] as number);
    }

    static fromEditor(editor: Editor): EditorDoc {
        let nodes = editor.state.doc.content
        let title = ''
        nodes.forEach((node) => {
            if (['heading'].includes(node.type.name) && title == '') {
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

    setUuid(uuid: string): this {
        this.uuid = uuid
        return this
    }

    setTitle(title: string): this {
        this.title = title
        return this
    }

    setContent(content: string): this {
        this.content = content
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