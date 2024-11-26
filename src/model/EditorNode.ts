import { JSONContent } from '@tiptap/vue-3'
import { TiptapEditor } from '../model/TiptapGroup'
import SmartText from '../extensions/SmartText'
import Article from '../extensions/Article'
import SmartDoc from '../extensions/SmartDoc'
import { EditorNodeNoParentIdError, EditorNodeNoUUIDError } from '../error/EditorNodeError'
import { CharacterCountStorage } from '@tiptap/extension-character-count'

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

    static fromJSON(json: JSONContent, parentId: string): EditorNode {
        let node = new EditorNode()
            .setTitle(getTitle(json))
            .setType(json.type ?? "")
            .setAttrs(json.attrs ?? {})
            .setParentId(parentId)

        if (node.type == SmartText.name && !node.getParentId()) {
            throw new EditorNodeNoParentIdError("Parent ID is not set", node)
        }

        if (node.type === SmartText.name && node.getUUID() === undefined) {
            node = node.setUUID(node.getParentId()! + '-text')
        }

        if (node.getUUID() === undefined && node.type !== SmartDoc.name) {
            throw new EditorNodeNoUUIDError(title + "::fromJSON -> UUID is not set", node)
        }

        node = node
            .setChildren(json.content?.map(child => EditorNode.fromJSON(child, node.getUUID()!)) ?? [])

        return node
    }

    static fromEditor(editor: TiptapEditor): EditorNode {
        let json = editor.getJSON()
        const characterCount = editor.storage.characterCount as CharacterCountStorage

        return EditorNode.fromJSON(json, "")
            .setHTML(editor.getHTML())
            .setWordCount(characterCount.words())
            .setCharacterCount(characterCount.characters())
    }

    public getUUID(): string | undefined {
        return this.attrs?.uuid
    }

    public getParentId(): string | undefined {
        return this.attrs?.parentId
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
        var nodeCopy = { ...this }
        var uuid = this.getUUID()

        if (!uuid && this.type == SmartText.name) {
            uuid = this.attrs?.parentId + "-text"
            nodeCopy = { ...this }
            nodeCopy.attrs = { ...nodeCopy.attrs, uuid }
        }

        if (!uuid) {
            throw new EditorNodeNoUUIDError("UUID is not set", this)
        }

        var flattened: EditorNode[] = [nodeCopy]

        this.children?.forEach(child => {
            flattened = flattened.concat(
                child
                    .setHTML(child.type == Article.name ? this.html : undefined)
                    .setParentId(uuid!)
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
        const text = json.text ?? ""
        return text.length > 20 ? text.substring(0, 20) + "..." : text
    }

    let content = json.content
    if (!content || content.length == 0) {
        return ""
    }

    return getTitle(content[0])
}

export default EditorNode