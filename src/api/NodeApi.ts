import EditorData from '../model/EditorData';
import NodeRequest from '../request/NodeRequest';
import { RequestStore } from '../store/RequestStore';
import { generateJSON, JSONContent } from '@tiptap/core'
import Config from '../config/config'
import { DOC, ROOT, TEXT } from '../config/nodes';
import UUIDHelper from '../helper/UUIDHelper';
import TiptapHelper from '../helper/TiptapHelper';
import { Editor } from "@tiptap/vue-3";

let title = "🔌 NodeApi"

export default class NodeApi {
    public request: RequestStore
    public editor: Editor

    constructor(requestProvider: RequestStore, editor: Editor) {
        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.request = requestProvider
        this.editor = editor
    }

    public setHTML(html: string) {
        let verbose = false

        if (verbose) {
            console.log(title, 'setHTML', html.length == 0 ? "[empty]" : html.substring(0, 100))
        }

        if (typeof html != 'string') {
            console.error(title, 'setHTML', 'html is not string', html)
            return
        }

        this.editor.commands.setContent(html, true)
    }

    public setHtmlEmpty() {
        this.setHTML(EditorData.default().html)
    }

    public setHtmlByRequest(id: string) {
        let verbose = false

        if (verbose) {
            console.log("setHtmlByRequest", id)
        }

        new NodeRequest(this.request.getBaseUrl()).getHtml(id).then((html) => {
            this.setHTML(fixHtml(html, id))
        }).catch((error) => {
            console.error(title, 'setHtmlByRequest', error)
        })
    }

    public getJSONFromHTML(html: string): JSONContent {
        return generateJSON(html, Config.extensions)
    }

    public getBlocksFromHTML(html: string): JSONContent[] {
        let verbose = false

        let blocks = flattenBlock(this.getJSONFromHTML(html)).map(b => {
            if (b.type == ROOT) {
                b.html = html
            }

            return b
        })

        if (verbose) {
            console.log(blocks)
        }

        return blocks
    }

    public getHTML(): string {
        return this.editor.getHTML()
    }

    public getNodes(): JSONContent {
        return this.editor.getJSON()
    }

    public insertToc() {
        this.editor.commands.addToc()
    }

    public removeToc() {
        this.editor.commands.removeToc()
    }

    public toggleToc() {
        this.editor.commands.toggleToc()
    }

    public setReadOnly() {
        this.editor.setEditable(false)
    }

    public setEditable() {
        this.editor.setEditable(true)
    }

    public toggleReadOnly() {
        this.editor.setEditable(!this.editor.isEditable)
    }

    public sendHtmlByRequest(html: string) {
        let verbose = false

        if (verbose) {
            console.log("sendHtmlByRequest", html)
        }

        new NodeRequest(this.request.getBaseUrl()).updateHtml(html).then((html) => {
            console.log("sendHtmlByRequest", html)
        }).catch((error) => {
            console.error(title, 'sendHtmlByRequest', error)
        })
    }
}

function fixHtml(html: string, uuid: string): string {
    let fixedHtml = `
    <div data-type="root" data-uuid="${uuid}">
        ${html}
    </div>
    `
    return fixedHtml
}

function flattenBlock(block: JSONContent): JSONContent[] {
    var newBlock = block

    if (newBlock.attrs == null) {
        newBlock.attrs = {}
    }

    if (newBlock.attrs.uuid == null) {
        newBlock.attrs.uuid = UUIDHelper.generate();
    }

    if (newBlock.type == ROOT) {
        newBlock.attrs.title = TiptapHelper.getTitle(newBlock)
    }

    var children = newBlock.content || []

    if (children.length > 0) {
        children.map(child => {
            child.attrs = child.attrs || {};

            if (child.type == TEXT) {
                if (newBlock.attrs && newBlock.attrs.uuid) {
                    child.attrs.uuid = "text-" + newBlock.attrs.uuid;
                }
            }

            if (newBlock.type !== DOC) {
                child.attrs.parent = newBlock.attrs!.uuid;
            }
        });
    }

    var flattened: JSONContent[] = []

    if (newBlock.type != DOC) {
        flattened.push(newBlock)
    }

    if (children.length > 0) {
        children.forEach(content => {
            flattened = flattened.concat(flattenBlock(content))
        })
    }

    const collection = flattened.map(b => {
        const { content, ...rest } = b;
        return rest;
    });

    collection.forEach(b => {
        if (!b.attrs?.uuid) {
            console.warn("uuid is null", b)
        }
    })

    return collection
}
