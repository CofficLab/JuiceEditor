import { JSONContent } from '@tiptap/vue-3'
import SmartText from '../extensions/SmartText'
import SmartDoc from '../extensions/SmartDoc'
import { TiptapEditor } from '../model/TiptapGroup'

class EditorNode {
    uuid: string = ""
    title: string = ""
    wordCount?: number
    characterCount?: number
    html?: string
    attrs?: Record<string, any> = {}
    type: string = ""
    children?: EditorNode[] = []

    static empty(): EditorNode {
        return new EditorNode()
    }

    static fromEditor(editor: TiptapEditor): EditorNode {
        return new EditorNode()
            .setTitle(getTitle(editor.getJSON()))
            .setHTML(editor.getHTML())
            .setWordCount(editor.storage.characterCount.words())
            .setCharacterCount(editor.storage.characterCount.characters())
    }

    public setWordCount(wordCount: number): EditorNode {
        this.wordCount = wordCount
        return this
    }

    public setCharacterCount(characterCount: number): EditorNode {
        this.characterCount = characterCount
        return this
    }

    public setHTML(html: string): EditorNode {
        this.html = html
        return this
    }

    public setTitle(title: string): EditorNode {
        this.title = title
        return this
    }

    public flattened(): EditorNode[] {
        var newBlock = this
        var flattened: EditorNode[] = []
        var children = newBlock.children || []

        if (newBlock.type != SmartDoc.name) {
            flattened.push(newBlock)
        }

        if (children.length > 0) {
            children.forEach(child => {
                flattened = flattened.concat(child.flattened())
            })
        }

        return flattened
    }
}

function getTitle(json: JSONContent): string {
    if (json.type == SmartText.name) {
        return json.text ?? ""
    }

    let content = json.content
    if (!content || content.length == 0) {
        return ""
    }

    return getTitle(content[0])
}

export default EditorNode