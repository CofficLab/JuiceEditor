import {
    CharacterCountExtension,
    CodeExtension,
    HistoryExtension,
    ItalicExtension,
    ListKeymapExtension,
    StrikeExtension,
    DropcursorExtension,
    GapcursorExtension,
    ParagraphExtension,
    HorizontalRuleExtension,
    TextAlignExtension,
    HighlightExtension,
    SubscriptExtension,
    UnderlineExtension,
    SuperscriptExtension,
    HardBreakExtension
} from "../model/TiptapGroup"
import Assistant from "../extensions/Assistant"
import Features from "../extensions/Features/Features"
import SmartTaskItem from "../extensions/SmartTaskItem"
import SmartListItem from "../extensions/SmartListItem"
import SmartHeading from "../extensions/SmartHeading"
import SmartTaskList from "../extensions/SmartTaskList"
import SmartPre from "../extensions/SmartCodeBlock/SmartCodeBlock"
import SmartImage from "../extensions/SmartImage/SmartImage"
import SmartLink from "../extensions/SmartLink"
import SmartText from "../extensions/SmartText"
import SmartParagraph from "../extensions/SmartParagraph"
import SmartBulletList from "../extensions/SmartBulletList"
import SmartQuote from "../extensions/SmartQuote"
import SmartSelection from "../extensions/SmartSelection"
import SmartTable from "../extensions/SmartTable"
import SmartTableRow from "../extensions/SmartTableRow"
import SmartTableHeader from "../extensions/SmartTableHeader"
import SmartTableCell from "../extensions/SmartTableCell"
import SmartDoc from "../extensions/SmartDoc"
import SmartBold from "../extensions/SmartBold"
import SmartKbd from "../extensions/SmartKbd"
import SmartPlaceholder from "../extensions/SmartPlaceholder"
import SmartReady from "../extensions/SmartReady"
import SmartSlot from "../extensions/SmartSlot"
import SmartNodes from "../extensions/SmartNodes"
import { SmartMenusExtension } from "../extensions/SmartMenus"
import WebKit from "../extensions/WebKit"
import LocalStorage from "../extensions/LocalStorage"
import SmartColor from "../extensions/SmartColor"
import WebStorage from "../extensions/WebStorage"
import { SmartActive } from "../extensions/SmartActive"
import Padding from "../extensions/Padding"
import SmartFocus from "../extensions/SmartFocus"
import Branch from "../extensions/Branch/Branch"
import BranchContent from "../extensions/BranchContent/BranchContent"
import Root from "../extensions/Root"
import NewLine from "../extensions/NewLine"
import Debug from "../extensions/Debug"
import { SmartEvent } from "../extensions/SmartEvent"
import Margin from "../extensions/Margin"
import { TextStyleExtension } from "../model/TiptapGroup";
import SmartFontFamily from "../extensions/SmartFontFamily";
import URLListener from "../extensions/URLListener"
import SmartAlert from "../extensions/SmartAlert/SmartAlert"
import SourceCode from '../extensions/SourceCode'
import SmartLog from '../extensions/SmartLog'
import makeExtensionsProps from '../interface/MakeExtensionProps'
import SmartApp from "../extensions/SmartApp"
import DragDrop from "../extensions/DragDrop"
import SmartToc from "../extensions/SmartToc/SmartToc"

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
        Assistant,
        Branch,
        BranchContent,
        CharacterCountExtension,
        CodeExtension.configure({
            HTMLAttributes: {
                class: 'code-class',
            },
        }),
        Debug,
        DragDrop,
        DropcursorExtension.configure({
            width: 4,
            class: 'dropcursor-class',
        }),
        Features,
        GapcursorExtension,
        HardBreakExtension,
        HighlightExtension.configure({
            HTMLAttributes: {
                class: 'highlight-class',
            },
        }),
        HistoryExtension.configure({
            depth: 100,
        }),
        HorizontalRuleExtension,
        ItalicExtension.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        ListKeymapExtension,
        LocalStorage,
        Margin,
        NewLine,
        Padding,
        Root.extend({
            content: `${SmartHeading.name} block*`,
        }),
        SmartActive,
        SmartAlert,
        SmartApp,
        SmartBold,
        SmartBulletList.configure({
            HTMLAttributes: {
                class: 'bullet-list-class',
            },
            itemTypeName: 'listItem',
            keepMarks: false,
            keepAttributes: false,
        }),
        SmartColor,
        SmartDoc,
        SmartEvent,
        SmartFocus.configure({
            className: props.focusClassName,
            mode: 'all',
        }),
        SmartFontFamily,
        SmartHeading,
        SmartImage.configure({
            drawIoLink: props.drawIoLink,
            allowBase64: true,
            HTMLAttributes: {
                class: 'not-prose'
            }
        }),
        SmartKbd,
        SmartLink.configure({
            protocols: ['ftp', 'mailto'],
            autolink: true,
            openOnClick: false,
            linkOnPaste: true,
            HTMLAttributes: {
                class: 'link link-primary link-hover mx-1',
            },
        }),
        SmartListItem,
        SmartLog,
        SmartMenusExtension,
        SmartNodes,
        SmartParagraph.configure({
            translateApi: props.translateApi,
        }),
        SmartPlaceholder,
        SmartPre,
        SmartQuote.configure({
            HTMLAttributes: {
                class: 'quote-class',
            },
        }),
        SmartReady,
        SmartSelection,
        SmartSlot,
        SmartTable.configure({
            resizable: true,
            HTMLAttributes: {
                class: 'my-table',
                uuid: null
            },
        }),
        SmartTableCell,
        SmartTableHeader,
        SmartTableRow,
        SmartTaskItem.configure({
            nested: true,
        }),
        SmartTaskList,
        SmartText,
        SmartToc,
        SourceCode,
        StrikeExtension.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        SubscriptExtension,
        SuperscriptExtension,
        TextAlignExtension.configure({
            types: [SmartHeading.name, ParagraphExtension.name],
        }),
        TextStyleExtension,
        UnderlineExtension,
        URLListener,
        WebKit,
        WebStorage,
    ]

    return extensions
}

export {
    makeExtensions,
    defaultDrawIoLink,
    defaultTranslateApi,
    defaultFocusClassName
}
