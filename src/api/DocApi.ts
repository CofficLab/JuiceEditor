import EditorData from '../model/EditorData';
import { DocStore } from '../store/EditorStore';
import DocRequest from '../request/DocRequest';
import { RequestStore } from '../store/RequestStore';
import { generateJSON, JSONContent } from '@tiptap/core'
import Config from '../config/config'
import { DOC, ROOT, TEXT } from '../config/nodes';
import UUIDHelper from '../helper/UUIDHelper';
import TiptapHelper from '../helper/TiptapHelper';
let title = "🔌 DocApi"

export default class DocApi {
    public store: DocStore
    public request: RequestStore

    constructor(editorProvider: DocStore, requestProvider: RequestStore) {
        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.store = editorProvider
        this.request = requestProvider
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

        let doc = this.store.getDoc()
        doc.html = html

        this.setDoc(doc)
    }

    public setDoc(doc: EditorData) {
        let verbose = false

        if (verbose) {
            console.log(title, 'setDoc', doc)
        }

        this.store.setDoc(doc, "DocApi setDoc")
    }

    public setDocEmpty() {
        this.setDoc(EditorData.default())
    }

    public setDocByRequest(id: string) {
        let verbose = false

        if (verbose) {
            console.log("setDocByRequest", id)
        }

        new DocRequest(this.request.getBaseUrl()).getDoc(id).then((doc) => {
            doc.html = fixHtml(doc.html, doc.attrs!.uuid)
            this.setDoc(doc)
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
