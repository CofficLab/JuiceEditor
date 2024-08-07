import { Editor } from '@tiptap/vue-3'
import { Editor as TiptapEditor } from '@tiptap/core'
import EditorData from '../../model/EditorData'
import makeExtensions from '../../config/extension'

interface Props {
    uuid: string,
    content: string
    editable: boolean
    onCreate: (data: EditorData) => void
    onUpdate: (data: EditorData) => void
    onSelectionUpdate?: (type: string) => void
    drawIoLink?: string
    monacoLink: string
    drawEnable: boolean
    tableEnable: boolean
}

class TiptapAgent {
    static create(props: Props): Editor {
        return new Editor({
            extensions: makeExtensions({
                drawIoLink: props.drawIoLink,
                drawEnable: props.drawEnable,
                tableEnable: props.tableEnable,
                monacoLink: props.monacoLink
            }),
            injectNonce: props.uuid,
            autofocus: false,
            content: props.content,
            editable: props.editable,
            onBeforeCreate: ({ editor }) => {
                console.log('🍋 🗒️ TiptapAgent: onBeforeCreate')
            },
            onCreate: ({ editor }) => {
                console.log('🍋 🗒️ TiptapAgent: onCreate, callback with EditorData')
                props.onCreate(EditorData.fromEditor(editor))
            },
            onFocus: ({ editor }) => {
                console.log('🍋 🗒️ TiptapAgent: onFocus')
            },
            onBlur: ({ editor }) => {
                console.log('🍋 🗒️ TiptapAgent: onBlur')
            },
            onDestroy(props) {
                console.log('🍋 🗒️ TiptapAgent: onDestroy')
            },
            onSelectionUpdate: ({ editor }) => {
                let type = TiptapAgent.getSelectionNodeType(editor)

                if (props.onSelectionUpdate) {
                    // console.log('TiptapAgent: onSelectionUpdate, callback with Editor', type)
                    props.onSelectionUpdate(type)
                } else {
                    console.log('TiptapAgent: onSelectionUpdate, no callback')
                }
            },
            onUpdate: ({ editor }) => {
                let editorData = EditorData.fromEditor(editor)
                if (props.onUpdate) {
                    console.log('🍋 🗒️ TiptapAgent: onUpdate, callback with EditorData')
                    props.onUpdate(editorData)
                } else {
                    console.log('🍋 🗒️ TiptapAgent: onUpdate, no callback')
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

        // console.log('shouldShowFloatingMenu: type', type)

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
}

export default TiptapAgent