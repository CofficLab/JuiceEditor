import { Editor, JSONContent } from '@tiptap/core'

export default class EditorData {
    public uuid: string = ""
    public title: string = ""
    public content: string = ""
    public json: JSONContent = {}
    public characterCount: number = 0
    public wordCount: number = 0

    static fromEditor(editor: Editor): EditorData {
        let nodes = editor.state.doc.content
        let title = ''
        nodes.forEach((node) => {
            if (['heading'].includes(node.type.name) && title == '') {
                title = node.textContent!
            }
        })

        return new EditorData()
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