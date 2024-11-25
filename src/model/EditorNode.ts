import { JSONContent } from '@tiptap/vue-3'
import { TiptapEditor } from '../model/TiptapGroup'
import SmartText from '../extensions/SmartText'
import UUIDHelper from '../helper/UUIDHelper'
import Article from '../extensions/Article'
import UUIDError from '../error/UUIDError'

let title = "🧱 EditorNode"

class EditorNode {
    title: string = ""
    wordCount?: number
    characterCount?: number
    html?: string
    attrs?: Record<string, any> = undefined
    type: string = 'unknown'
    children?: EditorNode[] = []

    static empty(): EditorNode {
        return new EditorNode()
    }

    static fromJSON(json: JSONContent): EditorNode {
        return new EditorNode()
            .setTitle(getTitle(json))
            .setType(json.type ?? "")
            .setAttrs(json.attrs ?? {})
            .setChildren(json.content?.map(child => EditorNode.fromJSON(child)) ?? [])
    }

    static fromEditor(editor: TiptapEditor): EditorNode {
        let json = editor.getJSON()

        return EditorNode.fromJSON(json)
            .setHTML(editor.getHTML())
            .setWordCount(editor.storage.characterCount.words())
            .setCharacterCount(editor.storage.characterCount.characters())
    }

    public getUUID(): string {
        let uuid = this.attrs?.uuid

        if (!uuid) {
            throw new UUIDError("UUID is not set", this)
        }

        return uuid
    }

    public updateFromEditor(editor: TiptapEditor, verbose: boolean = false): EditorNode {
        let json = editor.getJSON()

        if (verbose) {
            // console.log(title, "updateFromEditor", json)
            console.log(title, "updateFromEditor with type", json.type)
        }

        return this.setHTML(editor.getHTML())
            .setTitle(getTitle(json))
            .setType(json.type ?? "")
            .setChildren(json.content?.map(child => EditorNode.fromJSON(child)) ?? [])
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

    public setHTML(html: string | undefined): EditorNode {
        this.html = html
        return this
    }

    public setTitle(title: string): EditorNode {
        this.title = title
        return this
    }

    public setType(type: string): EditorNode {
        this.type = type
        return this
    }

    public flattened(): EditorNode[] {
        const nodeCopy: EditorNode = { ...this }
        var flattened: EditorNode[] = [nodeCopy]

        this.children?.forEach(child => {
            flattened = flattened.concat(
                child
                    .setHTML(child.type == Article.name ? this.html : undefined)
                    .setParentId(this.getUUID())
                    .flattened()
            )
        })

        flattened = flattened.map(n => {
            const node = new EditorNode();
            Object.assign(node, n);
            node.children = undefined;
            return node;
        });

        return flattened
    }

    public setChildren(children: EditorNode[]): EditorNode {
        this.children = children
        return this
    }

    public setAttrs(attrs: Record<string, any>): EditorNode {
        this.attrs = attrs
        return this
    }

    public setUUID(uuid: string): EditorNode {
        return this.setAttrs({ ...this.attrs, uuid })
    }

    public setParentId(parentId: string): EditorNode {
        return this.setAttrs({ ...this.attrs, parentId });
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