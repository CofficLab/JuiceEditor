import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import {
    ImageExtension, TiptapEditor, TiptapExtension, LinkExtension,
    HardBreakExtension, HeadingExtension, TableRowExtension,
    TableExtension, TableHeaderExtension,
    BlockquoteExtension
} from '../model/TiptapGroup'

export interface SmartMenusStorage {
    verbose: boolean,
    bubbleMenuAppeared: boolean,
    floatingMenuAppeared: boolean,
    color: string,
}

export interface SmartMenusOptions {
    eventName: string,
}

declare module '@tiptap/core' {
    interface Commands {
        SmartMenusExtension: {
            bubbleMenuAppeared: () => void
            floatingMenuAppeared: () => void
            setMenuBackgroundColor: (colorName: string) => void
        }
    }
}

export const colors: Record<string, string> = {
    'default': 'bg-slate-200 dark:bg-zinc-900/95',
    'red': 'bg-red-200 dark:bg-red-900/95',
    'blue': 'bg-blue-200 dark:bg-blue-900/95',
    'green': 'bg-green-200 dark:bg-green-900/95',
    'yellow': 'bg-yellow-200 dark:bg-yellow-900/95',
    'purple': 'bg-purple-200 dark:bg-purple-900/95',
    'pink': 'bg-pink-200 dark:bg-pink-900/95',
    'indigo': 'bg-indigo-200 dark:bg-indigo-900/95',
    'orange': 'bg-orange-200 dark:bg-orange-900/95',
    'cyan': 'bg-cyan-200 dark:bg-cyan-900/95',
    'teal': 'bg-teal-200 dark:bg-teal-900/95',
    'lime': 'bg-lime-200 dark:bg-lime-900/95',
    'amber': 'bg-amber-200 dark:bg-amber-900/95',
}

export const SmartMenusExtension = TiptapExtension.create<SmartMenusOptions, SmartMenusStorage>({
    name: 'smartMenus',

    addStorage() {
        return {
            verbose: true,
            title: '🫧 SmartMenus',
            bubbleMenuAppeared: false,
            floatingMenuAppeared: false,
            color: colors.default,
        }
    },

    addCommands() {
        return {
            bubbleMenuAppeared: () => ({ }) => {
                this.storage.bubbleMenuAppeared = true
                return true
            },

            floatingMenuAppeared: () => ({ }) => {
                this.storage.floatingMenuAppeared = true
                return true
            },

            setMenuBackgroundColor: (colorName: string) => ({ }) => {
                this.storage.color = colors[colorName] || colors.default
                return true
            }
        }
    }
})

export const shouldShowBubbleMenu = function (props: {
    editor: TiptapEditor
    view: EditorView
    state: EditorState
    oldState?: EditorState | undefined
    from: number
    to: number
}) {
    let verbose = false
    let emoji = '🫧'

    const { selection } = props.state
    const { empty } = selection
    const shouldShowNodes: string[] = [ImageExtension.name, LinkExtension.name]
    const excludes: string[] = []


    // 如果是只读模式，不显示
    if (props.editor.isEditable == false) {
        return false
    }

    // 如果当前是Heading，且Level=1，不显示
    if (props.editor.isActive(HeadingExtension.name) && props.editor.getAttributes(HeadingExtension.name).level === 1) {
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

    if (props.editor.isActive(HeadingExtension.name, { level: 1 })) {
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
    const excludes = [TableExtension.name, TableRowExtension.name, TableHeaderExtension.name]
    const { selection } = props.state
    const { $anchor, empty } = selection
    const isEmptyTextBlock =
        $anchor.parent.isTextblock && !$anchor.parent.type.spec.code && !$anchor.parent.textContent
    const type = $anchor.parent.type.name
    const { editor } = props

    // 如果在 H1 中，不展示
    if (type == HeadingExtension.name && selection.$head.parent.attrs.level == 1) {
        return false
    }

    // 如果当前是引用，不展示
    if (editor.isActive(BlockquoteExtension.name)) {
        return false
    }

    // HardBreak, do not show
    if (editor.isActive(HardBreakExtension.name)) {
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

export const shouldShowTextAlignMenu = function (editor: TiptapEditor) {
    if (editor.isActive(ImageExtension.name)) {
        return false
    }

    return true
}

export const shouldShowMarginMenu = function (editor: TiptapEditor) {
    return true
}

export function getSelectionTextLength(editor: TiptapEditor) {
    return getSelectionText(editor).length
}

export function isSelectionEmpty(editor: TiptapEditor) {
    return getSelectionTextLength(editor) == 0
}

export function hasSelection(editor: TiptapEditor) {
    return !isSelectionEmpty(editor)
}

export function getSelectionText(editor: TiptapEditor) {
    const { from, to, empty } = editor.state.selection
    if (empty) {
        return ''
    }
    return editor.state.doc.textBetween(from, to, '')
}