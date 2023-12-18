import { Editor } from "@tiptap/core"
import EventManager from "./EventManager"

const e = new EventManager()

export default class EditorEventHandler {
    constructor(editor: Editor) {
        e.onToggleToc(() => {
            editor.chain().focus().toggleToc().run()
        })

        e.onToggleBanner(() => {
            editor.chain().focus().toggleBanner().run()
        })

        e.onToggleBold(() => {
            editor.chain().focus().toggleBold().run()
        })

        e.onToggleItalic(() => {
            editor.chain().focus().toggleItalic().run()
        })

        e.onInsertDraw(() => {
            editor.commands.insertDrawIo()
        })

        e.onToggleLink(() => {
            editor.chain().focus().toggleLink().run()
        })

        e.onSetHeading1(() => {
            editor.chain().focus().setHeading({ level: 1 }).run()
        })

        e.onSetHeading2(() => {
            editor.chain().focus().setHeading({ level: 2 }).run()
        })

        e.onSetHeading3(() => {
            editor.chain().focus().setHeading({ level: 3 }).run()
        })

        e.onSetHeading4(() => {
            editor.chain().focus().setHeading({ level: 4 }).run()
        })

        e.onSetHeading5(() => {
            editor.chain().focus().setHeading({ level: 5 }).run()
        })

        e.onSetHeading6(() => {
            editor.chain().focus().setHeading({ level: 6 }).run()
        })
    }
}