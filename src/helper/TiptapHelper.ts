import { Editor as EditorVue } from '@tiptap/vue-3'
import { JSONContent, Editor } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { A, BANNER, BLOCKQUOTE, BULLET_LIST, CODE_BLOCK, DRAW, HEADING, IMAGE, LIST_ITEM, ORDERED_LIST, STRIKE, TABLE, TABLE_HEADER, TABLE_ROW, TEXT } from '../config/nodes';
import EditorData from '../model/EditorData';
import UUIDHelper from './UUIDHelper';
import { Root } from '../extensions/Root/Root';
import SmartDoc from '../extensions/SmartDoc';

const title = '📒 TiptapHelper'

interface Props {
    content: string
    editable: boolean
    onCreate: (data: EditorData | Error, editor: Editor) => void
    onUpdate: (data: EditorData | Error) => void
    onSelectionUpdate?: (type: string) => void
    drawEnable: boolean
    tableEnable: boolean
    extensions: any
}

class TiptapHelper {
    static create(props: Props): EditorVue {
        let verbose = false;
        if (verbose) {
            console.log(title, 'create with content', props.content)
        }

        return new EditorVue({
            extensions: props.extensions,
            injectNonce: "",
            autofocus: false,
            content: TiptapHelper.getValidContent(props.content),
            editable: props.editable,
            onBeforeCreate: ({ editor }) => {
                let verbose = false;
                if (verbose) {
                    console.log(title, 'onBeforeCreate')
                }
            },
            onCreate: ({ editor }) => {
                let verbose = false;
                if (verbose) {
                    console.log(title, 'onCreate, callback with EditorData')
                }
                props.onCreate(EditorData.fromEditor(editor), editor)
            },
            onFocus: ({ editor }) => {
                let verbose = false;
                if (verbose) {
                    console.log(title, 'onFocus')
                }
            },
            onBlur: ({ editor }) => {
                let verbose = false;
                if (verbose) {
                    console.log(title, 'onBlur')
                }
            },
            onDestroy(props) {
                let verbose = false;
                if (verbose) {
                    console.log(title, 'onDestroy')
                }
            },
            onSelectionUpdate: ({ editor }) => {
                let type = TiptapHelper.getSelectionNodeType(editor)

                if (props.onSelectionUpdate) {
                    // log('TiptapHelper: onSelectionUpdate, callback with Editor', type)
                    props.onSelectionUpdate(type)
                } else {
                    console.log(title, 'TiptapHelper: onSelectionUpdate, no callback')
                }
            },
            onUpdate: ({ editor }) => {
                let verbose = false;

                let errors = TiptapHelper.checkBlockUUID(editor)
                if (errors.length > 0) {
                    props.onUpdate(errors[0])
                    return
                }

                let doc = EditorData.fromEditor(editor)
                if (props.onUpdate) {
                    if (verbose) {
                        console.log(title, 'onUpdate, callback with EditorDoc', doc)
                    }
                    props.onUpdate(doc)
                } else {
                    console.log(title, 'onUpdate, no callback')
                }
            }
        })
    }

    static getSelectionNodeType(editor: Editor): string {
        let type = "paragraph"
        if (editor.isActive('paragraph')) {
            type = "paragraph"
        } else if (editor.isActive(HEADING, { level: 1 })) {
            type = "heading1"
        } else if (editor.isActive(HEADING, { level: 2 })) {
            type = "heading2"
        } else if (editor.isActive(HEADING, { level: 3 })) {
            type = "heading3"
        } else if (editor.isActive(HEADING, { level: 4 })) {
            type = "heading4"
        } else if (editor.isActive(HEADING, { level: 5 })) {
            type = "heading5"
        } else if (editor.isActive(HEADING, { level: 6 })) {
            type = "heading6"
        } else if (editor.isActive(CODE_BLOCK)) {
            type = "codeBlock"
        } else if (editor.isActive(BLOCKQUOTE)) {
            type = "blockquote"
        } else if (editor.isActive(BULLET_LIST)) {
            type = "bulletList"
        } else if (editor.isActive(ORDERED_LIST)) {
            type = "orderedList"
        } else if (editor.isActive(LIST_ITEM)) {
            type = "listItem"
        } else if (editor.isActive(IMAGE)) {
            type = "image"
        } else if (editor.isActive(DRAW)) {
            type = "draw"
        } else if (editor.isActive(TABLE)) {
            type = "table"
        } else if (editor.isActive('tableCell')) {
            type = "tableCell"
        } else if (editor.isActive(TABLE_ROW)) {
            type = "tableRow"
        } else if (editor.isActive(TABLE_HEADER)) {
            type = "tableHeader"
        } else if (editor.isActive(A)) {
            type = "link"
        } else if (editor.isActive(STRIKE)) {
            type = "strike"
        } else if (editor.isActive('code')) {
            type = "code"
        } else if (editor.isActive('italic')) {
            type = "italic"
        } else if (editor.isActive(ORDERED_LIST)) {
            type = "orderedList"
        } else if (editor.isActive(BULLET_LIST)) {
            type = "bulletList"
        } else if (editor.isActive(DRAW)) {
            type = "draw"
        } else if (editor.isActive(BANNER)) {
            type = "banner"
        }

        return type
    }

    // 获取尾部位置
    static getTailPosOf(editor: Editor, node: ProseMirrorNode, pos: number): number {
        const start = pos
        const end = start + node.nodeSize

        // console.log('start is', start)
        // console.log('size is', props.node.nodeSize)

        return end
    }

    // 别处传递给editor的content可能是html字符串，也可能是json字符串，这里确保是正确的
    static getValidContent(content: string): object | string {
        let verbose = false;
        if (verbose) {
            console.log(title, 'getValidContent')
        }

        if (content == '') {
            if (verbose) {
                console.log(title, 'IS EMPTY')
            }

            return ''
        }

        // 尝试解析成json
        try {
            let jsonObject = JSON.parse(content)

            if (verbose) {
                console.log(title, 'IS JSON')
            }

            return jsonObject
        } catch (e) {
            if (verbose) {
                console.log(title, 'Not JSON, As HTML')
            }

            return content
        }
    }

    static checkBlockUUID(editor: Editor): Error[] {
        let typesWithoutUUID = [
            'text',
            'tableRow',
            'tableHeader',
            'tableCell',
            'taskItem',
            'toc',
        ]

        var errors: Error[] = []

        // 检查每一个node，没有uuid属性则抛出异常
        editor.state.doc.descendants((node, pos) => {
            if (!typesWithoutUUID.includes(node.type.name) && !node.attrs.uuid) {
                // console.error(node)
                // errors.push(new Error(`Node [${node.type.name}] has no uuid`))
                // console.warn('Node has no uuid', node)
            }
        })

        return errors
    }

    static getTitle(json: JSONContent): string {
        if (json.type == TEXT) {
            return json.text ?? ""
        }

        let content = json.content
        if (!content || content.length == 0) {
            return ""
        }

        return this.getTitle(content[0])
    }

    static flattenBlock(block: JSONContent): JSONContent[] {
        var newBlock = block

        if (newBlock.attrs == null) {
            newBlock.attrs = {}
        }

        if (newBlock.attrs.uuid == null) {
            newBlock.attrs.uuid = UUIDHelper.generate();
        }

        if (newBlock.type == Root.name) {
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

                if (newBlock.type !== SmartDoc.name) {
                    child.attrs.parent = newBlock.attrs!.uuid;
                }
            });
        }

        var flattened: JSONContent[] = []

        if (newBlock.type != SmartDoc.name) {
            flattened.push(newBlock)
        }

        if (children.length > 0) {
            children.forEach(content => {
                flattened = flattened.concat(TiptapHelper.flattenBlock(content))
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
}

export default TiptapHelper

