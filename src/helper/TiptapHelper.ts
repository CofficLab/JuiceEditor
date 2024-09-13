import { Editor } from '@tiptap/vue-3'
import { Editor as TiptapEditor } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import DomHelper from './DomHelper';
import { A, BANNER, BLOCKQUOTE, BULLET_LIST, CODE_BLOCK, DRAW, HEADING, IMAGE, LIST_ITEM, ORDERED_LIST, STRIKE, TABLE, TABLE_HEADER, TABLE_ROW } from '../config/nodes';
import EditorDoc from '../model/EditorDoc';
import Config from '../config/config'

const title = '📒 TiptapHelper'

interface Props {
    uuid: string
    content: string
    editable: boolean
    onCreate: (data: EditorDoc | Error) => void
    onUpdate: (data: EditorDoc | Error) => void
    onSelectionUpdate?: (type: string) => void
    drawEnable: boolean
    tableEnable: boolean
    extensions: any
}

class TiptapHelper {
    static create(props: Props): Editor {
        let verbose = false;
        if (verbose) {
            console.log(title, 'create with content', props.content, 'and uuid', props.uuid)
        }

        if (props.uuid.length == 0) {
            throw new Error('uuid is empty')
        }

        return new Editor({
            extensions: props.extensions,
            injectNonce: props.uuid,
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
                props.onCreate(EditorDoc.fromEditor(editor))
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

                let doc = EditorDoc.fromEditor(editor)
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

    static isTableEnable(editor: Editor): Boolean {
        return editor.extensionManager.extensions.some(extension => {
            return extension.name === 'smart-table'
        })
    }

    static getSelectionNodeType(editor: TiptapEditor): string {
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

    static shouldShowFloatingMenu(props: {
        editor: import('@tiptap/core').Editor
        view: import('prosemirror-view').EditorView
        state: import('prosemirror-state').EditorState
        oldState?: import('prosemirror-state').EditorState | undefined
    }) {
        let isAtBannerPosition = props.editor.isActive('banner')
        let isAtSmartImagePosition = props.editor.isActive('image')
        const excludes = ['banner', 'draw', 'table', 'link', 'tableCell', 'tableRow', 'tableHeader']
        const { selection } = props.state
        const { $anchor, empty } = selection
        const isEmptyTextBlock =
            $anchor.parent.isTextblock && !$anchor.parent.type.spec.code && !$anchor.parent.textContent
        const type = $anchor.parent.type.name

        // log('shouldShowFloatingMenu: type', type)

        // 如果在 H1 中，不展示
        if (type == 'heading' && selection.$head.parent.attrs.level == 1) {
            return false
        }

        if (excludes.includes(type)) {
            return false
        }

        if (isAtBannerPosition && !isEmptyTextBlock) {
            return false
        }

        if (isAtSmartImagePosition) {
            return false
        }

        if (!isEmptyTextBlock) {
            return false
        }

        return true
    }

    // 获取尾部位置
    static getTailPosOf(editor: TiptapEditor, node: ProseMirrorNode, pos: number): number {
        const start = pos
        const end = start + node.nodeSize

        // console.log('start is', start)
        // console.log('size is', props.node.nodeSize)

        return end
    }

    // 在本节点的后面插入一行
    static newLineOf(editor: TiptapEditor, node: ProseMirrorNode, pos: number) {
        let tail = TiptapHelper.getTailPosOf(editor, node, pos)
        // console.log('new line, node is', node)
        // console.log('new line, pos is', pos)
        // console.log('node size is', node.nodeSize)
        // console.log('tail is', tail)
        editor.commands.insertContentAt(Math.min(tail, editor.state.doc.content.size), '<p></p>', {
            updateSelection: true,
            parseOptions: {
                preserveWhitespace: 'full'
            }
        })
        editor.commands.focus(tail)
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

    static checkBlockUUID(editor: TiptapEditor): Error[] {
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
                errors.push(new Error(`Node [${node.type.name}] has no uuid`))
                // console.warn('Node has no uuid', node)
            }
        })

        return errors
    }

    static getFocusedNodePosition(editor: TiptapEditor): { offsetTop: number | null, offsetLeft: number | null } {
        const currentNode: Element | null = DomHelper.querySelector(`.` + Config.focusClassName)
        if (currentNode === null) {
            return { offsetTop: null, offsetLeft: null }
        }

        // 当前元素距离页面顶部的距离
        let { offsetTop, offsetLeft } = currentNode as HTMLElement

        // 微修正菜单位置
        offsetTop = currentNode.tagName === 'DIV' ? offsetTop - 8 : offsetTop - 5
        let offsetY = 0
        if (editor.isActive('horizontalRule') || editor.isActive('table')) {
            offsetY = 5
        }
        if (editor.isActive('pagination')) {
            offsetY = -4
        }
        return { offsetTop, offsetLeft }
    }
}

export default TiptapHelper