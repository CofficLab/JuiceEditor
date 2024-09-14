import EditorData from '../model/EditorData';
import { DocStore } from '../store/EditorStore';
import DocRequest from '../request/DocRequest';
import { RequestStore } from '../store/RequestStore';
import { generateJSON, JSONContent } from '@tiptap/core'
import Config from '../config/config'
import { DOC, HEADING, TEXT } from '../config/nodes';
import UUIDHelper from '../helper/UUIDHelper';
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
        new DocRequest(this.request.getBaseUrl()).getDoc(id).then((doc) => {
            this.setDoc(doc)
        })
    }

    public getJSONFromHTML(html: string): JSONContent {
        return generateJSON(html, Config.extensions)
    }

    public getBlocksFromHTML(html: string): JSONContent[] {
        let blocks = flattenBlock(this.getJSONFromHTML(html))
        console.log(blocks)
        return blocks
    }
}


function flattenBlock(block: JSONContent): JSONContent[] {
    var newBlock = block

    if (newBlock.type == DOC) {
        if (newBlock.content) {
            newBlock.content.forEach(child => {
                if (child.type == HEADING && child.attrs && child.attrs.uuid) {
                    newBlock.attrs = newBlock.attrs || {};
                    newBlock.attrs.uuid = child.attrs.uuid + "-doc";
                }
            });
        }
    }

    if (newBlock.attrs == null) {
        newBlock.attrs = {}
    }

    if (newBlock.attrs.uuid == null) {
        newBlock.attrs.uuid = UUIDHelper.generate();
    }

    var children = newBlock.content || []

    if (children.length > 0) {
        children.map(child => {
            if (child.type == TEXT) {
                child.attrs = child.attrs || {};
                if (newBlock.attrs && newBlock.attrs.uuid) {
                    child.attrs.uuid = newBlock.attrs.uuid + "-text";
                }
            }
        });
    }

    var flattened: JSONContent[] = [newBlock]

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
