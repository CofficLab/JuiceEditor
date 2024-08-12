import { Editor } from '@tiptap/vue-3'
import { Editor as TiptapEditor } from '@tiptap/core'
import { Mark as ProseMirrorMark, Node as ProseMirrorNode, NodeType, ParseOptions } from '@tiptap/pm/model';
import EditorData from '../model/EditorData'
import makeExtensions from '../config/extension'

const verbose = false;

interface Props {
    uuid: string,
    content: string
    editable: boolean
    onCreate: (data: EditorData) => void
    onUpdate: (data: EditorData) => void
    onSelectionUpdate?: (type: string) => void
    drawIoLink?: string
    drawEnable: boolean
    tableEnable: boolean
}

class TiptapHelper {
    static create(props: Props): Editor {
        return new Editor({
            extensions: makeExtensions({
                drawIoLink: props.drawIoLink,
                drawEnable: props.drawEnable,
                tableEnable: props.tableEnable
            }),
            injectNonce: props.uuid,
            autofocus: false,
            content: props.content,
            editable: props.editable,
            onBeforeCreate: ({ editor }) => {
                log('onBeforeCreate')
            },
            onCreate: ({ editor }) => {
                log('onCreate, callback with EditorData')
                props.onCreate(EditorData.fromEditor(editor))
            },
            onFocus: ({ editor }) => {
                log('onFocus')
            },
            onBlur: ({ editor }) => {
                log('onBlur')
            },
            onDestroy(props) {
                log('onDestroy')
            },
            onSelectionUpdate: ({ editor }) => {
                let type = TiptapHelper.getSelectionNodeType(editor)

                if (props.onSelectionUpdate) {
                    // log('TiptapHelper: onSelectionUpdate, callback with Editor', type)
                    props.onSelectionUpdate(type)
                } else {
                    log('TiptapHelper: onSelectionUpdate, no callback')
                }
            },
            onUpdate: ({ editor }) => {
                let editorData = EditorData.fromEditor(editor)
                if (props.onUpdate) {
                    log('onUpdate, callback with EditorData')
                    props.onUpdate(editorData)
                } else {
                    log('onUpdate, no callback')
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
        } else if (editor.isActive('heading', { level: 1 })) {
            type = "heading1"
        } else if (editor.isActive('heading', { level: 2 })) {
            type = "heading2"
        } else if (editor.isActive('heading', { level: 3 })) {
            type = "heading3"
        } else if (editor.isActive('heading', { level: 4 })) {
            type = "heading4"
        } else if (editor.isActive('heading', { level: 5 })) {
            type = "heading5"
        } else if (editor.isActive('heading', { level: 6 })) {
            type = "heading6"
        } else if (editor.isActive('codeBlock')) {
            type = "codeBlock"
        } else if (editor.isActive('blockquote')) {
            type = "blockquote"
        } else if (editor.isActive('bulletList')) {
            type = "bulletList"
        } else if (editor.isActive('orderedList')) {
            type = "orderedList"
        } else if (editor.isActive('listItem')) {
            type = "listItem"
        } else if (editor.isActive('image')) {
            type = "image"
        } else if (editor.isActive('draw')) {
            type = "draw"
        } else if (editor.isActive('table')) {
            type = "table"
        } else if (editor.isActive('tableCell')) {
            type = "tableCell"
        } else if (editor.isActive('tableRow')) {
            type = "tableRow"
        } else if (editor.isActive('tableHeader')) {
            type = "tableHeader"
        } else if (editor.isActive('link')) {
            type = "link"
        } else if (editor.isActive('strike')) {
            type = "strike"
        } else if (editor.isActive('code')) {
            type = "code"
        } else if (editor.isActive('underline')) {
            type = "underline"
        } else if (editor.isActive('bold')) {
            type = "bold"
        } else if (editor.isActive('italic')) {
            type = "italic"
        } else if (editor.isActive('superscript')) {
            type = "superscript"
        } else if (editor.isActive('subscript')) {
            type = "subscript"
        } else if (editor.isActive('orderedList')) {
            type = "orderedList"
        } else if (editor.isActive('bulletList')) {
            type = "bulletList"
        } else if (editor.isActive('draw')) {
            type = "draw"
        } else if (editor.isActive('banner')) {
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
}

export default TiptapHelper

function log(...message: any[]) {
    if (verbose) console.log("🍋 TiptapHelper:", ...message)
}