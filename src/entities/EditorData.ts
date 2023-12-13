import { Editor } from '@tiptap/core'

export default class EditorData {
    public title: string = ""
    public content: string = ""
    public characterCount: number = 0
    public wordCount: number = 0

    static fromEditor(editor: Editor): EditorData {
        let nodes = editor.state.doc.content
        let title = ''
        nodes.forEach((node) => {
            if (node.type.name == 'heading' && title == '') {
                title = node.textContent!
            }
        })

        return new EditorData()
            .setTitle(title)
            .setContent(editor.getHTML())
            .setCharacterCount(editor.storage.characterCount.characters())
            .setWordCount(editor.storage.characterCount.words())
    }

    setTitle(title: string): this {
        this.title = title
        return this
    }

    setContent(content: string): this {
        this.content = content
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