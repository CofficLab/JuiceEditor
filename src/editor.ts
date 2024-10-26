import { Editor as EditorVue } from '@tiptap/vue-3'
import CharacterCount from "@tiptap/extension-character-count"
import Code from "@tiptap/extension-code"
import History from "@tiptap/extension-history"
import Italic from "@tiptap/extension-italic"
import ListItem from "@tiptap/extension-list-item"
import Strike from "@tiptap/extension-strike"
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import Table from "@tiptap/extension-table"
import Highlight from "@tiptap/extension-highlight"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import TableCell from "@tiptap/extension-table-cell"
import TaskItem from "@tiptap/extension-task-item"
import { SmartReady } from "./extensions/SmartReady"
import { SmartSlot } from "./extensions/SmartSlot"
import { SmartNodes } from "./extensions/SmartNodes"
import HardBreak from "@tiptap/extension-hard-break"
import Subscript from "@tiptap/extension-subscript"
import Text from "@tiptap/extension-text"
import ListKeymap from '@tiptap/extension-list-keymap'
import { WebKit } from "./extensions/WebKit"
import { LocalStorage } from "./extensions/LocalStorage"
import Underline from "@tiptap/extension-underline"
import { SmartColor } from "./extensions/SmartColor"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from '@tiptap/extension-text-align'
import { WebStorage } from "./extensions/WebStorage"
import SmartHeading from "./extensions/SmartHeading"
import SmartTaskList from "./extensions/SmartTaskList/SmartTaskList"
import SmartPre from "./extensions/SmartPre/SmartPre"
import SmartImage from "./extensions/SmartImage/SmartImage"
import SmartLink from "./extensions/SmartLink/SmartLink"
import SmartParagraph from "./extensions/SmartParagraph"
import SmartBulletList from "./extensions/SmartBulletList/SmartBulletList"
import SmartQuote from "./extensions/SmartQuote"
import { SmartActive } from "./extensions/SmartActive"
import TableRow from "@tiptap/extension-table-row"
import TableHeader from "@tiptap/extension-table-header"
import SmartSelection from "./extensions/SmartSelection"
import { Padding } from "./extensions/Padding"
import { SmartFocus } from "./extensions/SmartFocus"
import { Branch } from "./extensions/Branch/Branch"
import { BranchContent } from "./extensions/BranchContent/BranchContent"
import { Root } from "./extensions/Root/Root"
import { NewLine } from "./extensions/NewLine"
import { Debug } from "./extensions/Debug"
import { SmartEvent } from "./extensions/SmartEvent"
import SmartDoc from "./extensions/SmartDoc"
import SmartBold from "./extensions/SmartBold"
import SmartPlaceholder from "./extensions/SmartPlaceholder"
import { Margin } from "./extensions/Margin"
import TextStyle from "@tiptap/extension-text-style";
import { SmartFontFamily } from "./extensions/SmartFontFamily";
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import { URLListener } from "./extensions/URLListener"
import { SmartAlert } from "./extensions/SmartAlert/SmartAlert"
import { SourceCode } from './extensions/SourceCode'
import { SmartLog } from './extensions/SmartLog'
interface makeExtensionsProps {
    drawIoLink: string,
    drawEnable?: boolean,
    tableEnable?: boolean,
    translateApi: string,
    focusClassName: string
}

const isDebug = process.env.NODE_ENV === 'development'
const defaultTranslateApi = isDebug
    ? 'http://127.0.0.1/api/translate'
    : 'http://127.0.0.1:49493/api/translate'
const defaultFocusClassName = 'focused'
const defaultDrawIoLink = isDebug
    ? '/drawio/webapp/index.html?'
    : '/drawio/index.html?'

function makeExtensions(props: makeExtensionsProps) {
    var extensions = [
        Debug,
        Root.extend({
            content: `${Heading.name} block*`,
        }),
        Branch,
        BranchContent,
        SmartAlert,
        SmartDoc,
        Dropcursor.configure({
            width: 4,
            class: 'dropcursor-class',
        }),
        URLListener,
        Margin,
        SmartQuote.configure({
            HTMLAttributes: {
                class: 'quote-class',
            },
        }),
        SmartColor,
        SmartFontFamily,
        SmartBulletList.configure({
            HTMLAttributes: {
                class: 'bullet-list-class',
            },
            itemTypeName: 'listItem',
            keepMarks: false,
            keepAttributes: false,
        }),
        TextStyle,
        Underline,
        WebStorage,
        SmartBold,
        Highlight.configure({
            HTMLAttributes: {
                class: 'highlight-class',
            },
        }),
        Code.configure({
            HTMLAttributes: {
                class: 'code-class',
            },
        }),
        SmartPre,
        Gapcursor,
        SmartActive,
        Superscript,
        CharacterCount,
        SmartImage.configure({
            drawIoLink: props.drawIoLink,
            allowBase64: true,
            HTMLAttributes: {
                class: 'smart-image'
            }
        }),
        SmartFocus.configure({
            className: props.focusClassName,
            mode: 'all',
        }),
        ListKeymap,
        SmartHeading,
        History.configure({
            depth: 100,
        }),
        Italic.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        ListItem.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        SmartParagraph.configure({
            translateApi: props.translateApi,
        }),
        LocalStorage,
        Padding,
        NewLine,
        SmartLog,
        SmartPlaceholder,
        SmartSelection,
        SmartLink.configure({
            protocols: ['ftp', 'mailto'],
            autolink: true,
            openOnClick: false,
            linkOnPaste: true,
            HTMLAttributes: {
                class: 'link link-primary link-hover mx-1',
            },
        }),
        Subscript,
        SmartReady,
        Strike.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        HardBreak,
        TaskItem.configure({
            nested: true,
        }),
        SmartTaskList,
        SmartEvent,
        Text,
        Table.configure({
            resizable: true,
            HTMLAttributes: {
                class: 'my-table',
                uuid: null
            },
        }),
        TableRow,
        WebKit,
        TableCell,
        TableHeader,
        HorizontalRule,
        TextAlign.configure({
            types: [Heading.name, Paragraph.name],
        }),
        SmartSlot,
        SmartNodes,
        SourceCode
    ]

    return extensions
}

const tiptapEditor = new EditorVue({
    extensions: makeExtensions({
        drawIoLink: defaultDrawIoLink,
        translateApi: defaultTranslateApi,
        focusClassName: defaultFocusClassName,
    }),
    autofocus: 'start',
})

export default tiptapEditor