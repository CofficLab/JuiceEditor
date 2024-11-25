import { Editor, Extension } from '@tiptap/core'
import { BubbleMenu } from '@tiptap/vue-3'
import Blockquote from '@tiptap/extension-blockquote'
import CharacterCount from '@tiptap/extension-character-count'
import Code from '@tiptap/extension-code'
import Color from '@tiptap/extension-color'
import Dropcursor from "@tiptap/extension-dropcursor"
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import FontFamily from '@tiptap/extension-font-family'
import { FloatingMenu } from '@tiptap/vue-3'
import Gapcursor from "@tiptap/extension-gapcursor"
import HardBreak from "@tiptap/extension-hard-break"
import Heading from '@tiptap/extension-heading'
import Highlight from "@tiptap/extension-highlight"
import History from "@tiptap/extension-history"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Italic from "@tiptap/extension-italic"
import Image from '@tiptap/extension-image'
import ListItem from "@tiptap/extension-list-item"
import ListKeymap from '@tiptap/extension-list-keymap'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Strike from "@tiptap/extension-strike"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import Table from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import TaskItem from "@tiptap/extension-task-item"
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from "@tiptap/extension-underline"

const priorityOfToc = 10
const priorityOfNodeStore = 20
const priorityOfArticle = 100

export {
    priorityOfToc,
    priorityOfArticle,
    priorityOfNodeStore,

    Blockquote as BlockquoteExtension,
    BubbleMenu as BubbleMenuExtension,
    CharacterCount as CharacterCountExtension,
    Code as CodeExtension,
    Color as ColorExtension,
    Dropcursor as DropcursorExtension,
    Editor as TiptapEditor,
    EditorView as TiptapEditorView,
    EditorState as TiptapEditorState,
    Extension as TiptapExtension,
    FontFamily as FontFamilyExtension,
    FloatingMenu,
    Gapcursor as GapcursorExtension,
    HardBreak as HardBreakExtension,
    Heading as HeadingExtension,
    Highlight as HighlightExtension,
    History as HistoryExtension,
    HorizontalRule as HorizontalRuleExtension,
    Italic as ItalicExtension,
    Image as ImageExtension,
    ListItem as ListItemExtension,
    ListKeymap as ListKeymapExtension,
    Link as LinkExtension,
    Paragraph as ParagraphExtension,
    Strike as StrikeExtension,
    Subscript as SubscriptExtension,
    Superscript as SuperscriptExtension,
    Table as TableExtension,
    TableCell as TableCellExtension,
    TableHeader as TableHeaderExtension,
    TableRow as TableRowExtension,
    TaskItem as TaskItemExtension,
    TextAlign as TextAlignExtension,
    TextStyle as TextStyleExtension,
    Underline as UnderlineExtension,
}
