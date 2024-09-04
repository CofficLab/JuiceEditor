import { Editor, JSONContent } from '@tiptap/core'
import { DOC, HEADING } from '../config/nodes'
import EditorBlock from './EditorBlock'

const emoji = '🍉 EditorDoc'

// 从编辑器中能获得的数据
export default class EditorDoc extends EditorBlock {
    public uuid: string = ""
    public title: string = ""
    public html: string = ""
    public wordCount: number = 0
    public characterCount: number = 0

    static default(): EditorDoc {
        return new EditorDoc()
            .setType(DOC)
            .setAttributes({})
            .setChildren([])
    }

    static fromJSONString(jsonString: string): EditorDoc {
        const parsedJson = JSON.parse(jsonString);
        const doc = new EditorDoc();

        // 只复制 EditorDoc 中存在的属性
        const docProperties = ['uuid', 'title', 'html', 'wordCount', 'characterCount', 'type', 'attributes'];
        docProperties.forEach(prop => {
            if (prop in parsedJson) {
                (doc as any)[prop] = parsedJson[prop];
            }
        });

        // 确保 children 是 EditorBlock 实例
        if (Array.isArray(parsedJson.children)) {
            doc.children = parsedJson.children.map((child: JSONContent) => EditorBlock.fromJSONContent(child));
        }

        return doc;
    }

    static fromBase64(base64: string): EditorDoc {
        const jsonString = atob(base64);
        return EditorDoc.fromJSONString(jsonString);
    }

    static fromEditor(editor: Editor): EditorDoc {
        let verbose = false

        if (verbose) {
            console.log(emoji, 'fromEditor', editor.getJSON())
        }

        if (editor.options.injectNonce == undefined) {
            throw new Error('EditorDoc.fromEditor: injectNonce is undefined')
        }

        // {"type":"doc","content":[{"type":"heading","attrs":{"textAlign":"left","uuid":"63346510-ecc6-421c-9eac-15259ff5f9d2","level":1}}]}
        let json: JSONContent = editor.getJSON()
        let doc = new EditorDoc()

        doc.type = json.type ?? ""
        doc.attributes = json.attrs ?? {}
        doc.uuid = editor.options.injectNonce
        doc.wordCount = editor.storage.characterCount.words()
        doc.characterCount = editor.storage.characterCount.characters()
        doc.html = editor.getHTML()
        doc.title = EditorDoc.getTitleFromEditor(editor)

        if (doc.type != DOC) {
            throw new Error('EditorBlock.fromEditor: block.type is not DOC')
        }

        if (json.content) {
            doc.children = json.content.map((block) => EditorBlock.fromJSONContent(block))
        }

        return doc
    }

    toJSONString(): string {
        return JSON.stringify(this)
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