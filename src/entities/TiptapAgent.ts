import { Editor } from '@tiptap/core'
import makeExtensions from './Extensions'
import EditorData from './EditorData'

interface Props {
    uuid: string,
    content: string
    editable: boolean
    onUpdate: (data: EditorData) => void
    onSelectionUpdate: (editor: Editor) => void
    drawIoLink?: string
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
            }),
            injectNonce: props.uuid,
            autofocus: true,
            content: props.content,
            editable: props.editable,
            onBeforeCreate: ({ editor }) => {
                console.log('TiptapEditor: onBeforeCreate')
            },
            onCreate: ({ editor }) => {
                console.log('TiptapEditor: onCreate')
            },
            onFocus: ({ editor }) => {
                console.log('TiptapEditor: onFocus')
            },
            onDestroy(props) {
                console.log('TiptapEditor: onDestroy')
            },
            onSelectionUpdate: ({ editor }) => {
                if (props.onSelectionUpdate) {
                    console.log('TiptapEditor: onSelectionUpdate, callback with Editor')
                    props.onSelectionUpdate(editor)
                } else {
                    console.log('TiptapEditor: onSelectionUpdate, no callback')
                }
            },
            onUpdate: ({ editor }) => {
                let editorData = EditorData.fromEditor(editor)
                if (props.onUpdate) {
                    console.log('TiptapEditor: onUpdate, callback with EditorData')
                    props.onUpdate(editorData)
                } else {
                    console.log('TiptapEditor: onUpdate, no callback')
                }
            }
        })
    }

    static isDrawEnable(editor: Editor): Boolean {
        return editor.extensionManager.extensions.some(extension => {
            return extension.name === 'draw'
        })
    }

    static isTableEnable(editor: Editor): Boolean {
        return editor.extensionManager.extensions.some(extension => {
            return extension.name === 'table'
        })
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