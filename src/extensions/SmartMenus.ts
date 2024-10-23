import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { Editor as TiptapEditor } from '@tiptap/core'
import { IMAGE, TABLE, LINK, TOC, DRAW, TABLE_CELL, TABLE_ROW, TABLE_HEADER, BRANCH, BRANCH_CONTENT } from '../config/nodes'
import Heading from '@tiptap/extension-heading'

let emoji = '🫧 BubbleMenusExtension'

export const shouldShowBubbleMenu = function (props: {
    editor: TiptapEditor
    view: EditorView
    state: EditorState
    oldState?: EditorState | undefined
    from: number
    to: number
}) {
    let verbose = false

    const { selection } = props.state
    const { empty } = selection
    const shouldShowNodes = [IMAGE, LINK]
    const excludes = [TOC]

    // 如果是只读模式，不显示
    if (props.editor.isEditable == false) {
        return false
    }

    // 如果当前是Heading，且Level=1，不显示
    if (props.editor.isActive(Heading.name) && props.editor.getAttributes(Heading.name).level === 1) {
        return false
    }

    // 如果当前是应该显示的节点，显示
    if (shouldShowNodes.some(node => props.editor.isActive(node))) {
        if (verbose) {
            console.log(emoji, 'show bubble menu, node is should show')
        }
        return true;
    }

    if (excludes.some(node => props.editor.isActive(node))) {
        if (verbose) {
            console.log(emoji, 'hide bubble menu, node is excluded')
        }
        return false;
    }

    if (props.editor.isActive(Heading.name, { level: 1 })) {
        if (verbose) {
            console.log(emoji, 'hide bubble menu, current is h1')
        }
        return false
    }

    if (!selection.visible) {
        if (verbose) {
            console.log(emoji, 'invisible selection, hide bubble menu')
        }
        return false
    }

    if (empty) {
        if (verbose) {
            console.log(emoji, 'empty selection, hide bubble menu')
        }
    } else {
        if (verbose) {
            console.log(emoji, 'not empty selection, show bubble menu')
        }
    }

    return !empty
}

export const shouldShowFloatingMenu = function (props: {
    editor: TiptapEditor
    view: EditorView
    state: import('prosemirror-state').EditorState
    oldState?: import('prosemirror-state').EditorState | undefined
}) {
    let isAtBannerPosition = props.editor.isActive('banner')
    let isAtSmartImagePosition = props.editor.isActive('image')
    const excludes = [DRAW, TABLE, TABLE_ROW, TABLE_HEADER]
    const { selection } = props.state
    const { $anchor, empty } = selection
    const isEmptyTextBlock =
        $anchor.parent.isTextblock && !$anchor.parent.type.spec.code && !$anchor.parent.textContent
    const type = $anchor.parent.type.name
    const { editor } = props

    // 如果在 H1 中，不展示
    if (type == Heading.name && selection.$head.parent.attrs.level == 1) {
        return false
    }

    // 如果在 excludes 中，不展示
    if (excludes.includes(type)) {
        return false
    }

    // 如果 excludes 中的节点 active，不展示
    if (excludes.some(extension => editor.isActive(extension))) {
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