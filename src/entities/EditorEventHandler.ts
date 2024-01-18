import { Editor } from "@tiptap/core"
import EventManager from "./EventManager"

const e = new EventManager()

export default class EditorEventHandler {
    constructor(editor: Editor, onMessage: (message: string) => void) {
        e.onToggleToc(() => {
            editor.chain().focus().toggleToc().run()
        })

        e.onToggleBanner(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.chain().focus().toggleBanner().run()
        })

        e.onToggleBold(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.chain().focus().toggleBold().run()
        })

        e.onToggleItalic(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.chain().focus().toggleItalic().run()
        })

        e.onToggleTaskList(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.chain().focus().toggleTaskList().run()
        })

        e.onInsertDraw(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.commands.insertDrawIo()
        })

        e.onInsertTable(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.commands.insertSmartTable()
        })

        e.onToggleLink(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.chain().focus().toggleLink().run()
        })

        e.onSetHeading1(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.chain().focus().setHeading({ level: 1 }).run()
        })

        e.onSetHeading2(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.chain().focus().setHeading({ level: 2 }).run()
        })

        e.onSetHeading3(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.chain().focus().setHeading({ level: 3 }).run()
        })

        e.onSetHeading4(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.chain().focus().setHeading({ level: 4 }).run()
        })

        e.onSetHeading5(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.chain().focus().setHeading({ level: 5 }).run()
        })

        e.onSetHeading6(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.chain().focus().setHeading({ level: 6 }).run()
        })

        e.onSetParagraph(() => {
            if (!editor.isEditable) {
                return onMessage('当前为只读模式')
            }

            editor.chain().focus().setParagraph().run()
        })
    }
}