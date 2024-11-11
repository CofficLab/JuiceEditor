import {
    CharacterCountExtension,
    CodeExtension,
    HistoryExtension,
    HeadingExtension,
    ItalicExtension,
    ListItemExtension,
    ListKeymapExtension,
    StrikeExtension,
    DropcursorExtension,
    GapcursorExtension,
    ParagraphExtension,
    TableExtension,
    TableHeaderExtension,
    HorizontalRuleExtension,
    TextAlignExtension,
    HighlightExtension,
    SubscriptExtension,
    TableCellExtension,
    TaskItemExtension,
    TableRowExtension,
    UnderlineExtension,
    SuperscriptExtension,
    HardBreakExtension
} from "../model/TiptapGroup"
import { SmartReady } from "../extensions/SmartReady"
import { SmartSlot } from "../extensions/SmartSlot"
import Features from "../extensions/Features/Features"
import { SmartNodes } from "../extensions/SmartNodes"
import SmartText from "../extensions/SmartText"
import { SmartMenusExtension } from "../extensions/SmartMenus"
import { WebKit } from "../extensions/WebKit"
import { LocalStorage } from "../extensions/LocalStorage"
import { SmartColor } from "../extensions/SmartColor"
import { WebStorage } from "../extensions/WebStorage"
import SmartHeading from "../extensions/SmartHeading"
import SmartTaskList from "../extensions/SmartTaskList"
import SmartPre from "../extensions/SmartCodeBlock/SmartCodeBlock"
import SmartImage from "../extensions/SmartImage/SmartImage"
import SmartLink from "../extensions/SmartLink"
import SmartParagraph from "../extensions/SmartParagraph"
import SmartBulletList from "../extensions/SmartBulletList"
import SmartQuote from "../extensions/SmartQuote"
import { SmartActive } from "../extensions/SmartActive"
import SmartSelection from "../extensions/SmartSelection"
import { Padding } from "../extensions/Padding"
import { SmartFocus } from "../extensions/SmartFocus"
import { Branch } from "../extensions/Branch/Branch"
import { BranchContent } from "../extensions/BranchContent/BranchContent"
import { Root } from "../extensions/Root"
import { NewLine } from "../extensions/NewLine"
import { Debug } from "../extensions/Debug"
import { SmartEvent } from "../extensions/SmartEvent"
import SmartDoc from "../extensions/SmartDoc"
import SmartBold from "../extensions/SmartBold"
import SmartPlaceholder from "../extensions/SmartPlaceholder"
import { Margin } from "../extensions/Margin"
import { TextStyleExtension } from "../model/TiptapGroup";
import { SmartFontFamily } from "../extensions/SmartFontFamily";
import { URLListener } from "../extensions/URLListener"
import { SmartAlert } from "../extensions/SmartAlert/SmartAlert"
import { SourceCode } from '../extensions/SourceCode'
import { SmartLog } from '../extensions/SmartLog'
import { makeExtensionsProps } from '../interface/MakeExtensionProps'
import { SmartApp } from "../extensions/SmartApp"
import SmartKbd from "../extensions/SmartKbd"
import { DragDrop } from "../extensions/DragDrop"
import { SmartToc } from "../extensions/SmartToc/SmartToc"
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
        SmartToc,
        Root.extend({
            content: `${HeadingExtension.name} block*`,
        }),
        Branch,
        Features,
        BranchContent,
        SmartAlert,
        SmartDoc,
        DragDrop,
        DropcursorExtension.configure({
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
        TextStyleExtension,
        UnderlineExtension,
        WebStorage,
        SmartBold,
        HighlightExtension.configure({
            HTMLAttributes: {
                class: 'highlight-class',
            },
        }),
        CodeExtension.configure({
            HTMLAttributes: {
                class: 'code-class',
            },
        }),
        SmartPre,
        GapcursorExtension,
        SmartApp,
        SmartKbd,
        SmartActive,
        SmartMenusExtension,
        SuperscriptExtension,
        CharacterCountExtension,
        SmartImage.configure({
            drawIoLink: props.drawIoLink,
            allowBase64: true,
            HTMLAttributes: {
                class: 'not-prose'
            }
        }),
        SmartFocus.configure({
            className: props.focusClassName,
            mode: 'all',
        }),
        ListKeymapExtension,
        SmartHeading,
        HistoryExtension.configure({
            depth: 100,
        }),
        ItalicExtension.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        ListItemExtension.configure({
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
        SubscriptExtension,
        SmartReady,
        StrikeExtension.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        HardBreakExtension,
        TaskItemExtension.configure({
            nested: true,
        }),
        SmartTaskList,
        SmartEvent,
        SmartText,
        TableExtension.configure({
            resizable: true,
            HTMLAttributes: {
                class: 'my-table',
                uuid: null
            },
        }),
        TableRowExtension,
        WebKit,
        TableCellExtension,
        TableHeaderExtension,
        HorizontalRuleExtension,
        TextAlignExtension.configure({
            types: [HeadingExtension.name, ParagraphExtension.name],
        }),
        SmartSlot,
        SmartNodes,
        SourceCode
    ]

    return extensions
}

export {
    makeExtensions,
    defaultDrawIoLink,
    defaultTranslateApi,
    defaultFocusClassName
}
