import Bold from "@tiptap/extension-bold"
import CharacterCount from "@tiptap/extension-character-count"
import Code from "@tiptap/extension-code"
import Color from "@tiptap/extension-color"
import History from "@tiptap/extension-history"
import Italic from "@tiptap/extension-italic"
import ListItem from "@tiptap/extension-list-item"
import Placeholder from "@tiptap/extension-placeholder"
import Strike from "@tiptap/extension-strike"
import Dropcursor from '@tiptap/extension-dropcursor'
import Focus from '@tiptap/extension-focus'
import Table from "@tiptap/extension-table"
import Highlight from "@tiptap/extension-highlight"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import TaskItem from "@tiptap/extension-task-item"
import Text from "@tiptap/extension-text"
import TextAlign from '@tiptap/extension-text-align'
import { Toc } from "../extensions/Toc/Toc"
import { Document } from "@tiptap/extension-document"
import SmartHeading from "../extensions/SmartHeading/SmartHeading"
import SmartTaskList from "../extensions/SmartTaskList/SmartTaskList"
import SmartTable from "../extensions/SmartTable/SmartTable"
import SmartPre from "../extensions/SmartPre/SmartPre"
import SmartImage from "../extensions/SmartImage/SmartImage"
import SmartLink from "../extensions/SmartLink/SmartLink"
import SmartParagraph from "../extensions/SmartParagraph/SmartParagraph"
import SmartBulletList from "../extensions/SmartBulletList/SmartBulletList"
import SmartQuote from "../extensions/SmartQuote/SmartQuote"
import SmartKbd from "../extensions/SmartKbd/SmartKbd"
import UUID from "../extensions/UUID/UUID"
import { v4 as uuidv4 } from "uuid";
import SmartTableHeader from "../extensions/SmartTableHeader/SmartTableHeader"
import SmartTableRow from "../extensions/SmartTableRow/SmartTableRow"
import Panel from "../extensions/Panel/Panel"
import SmartSelection from "../extensions/SmartSelection"
import { SmartHover } from "../extensions/SmartHover"
import { Ring } from "../extensions/Ring"
import { Padding } from "../extensions/Padding"
import { SmartFocus } from "../extensions/SmartFocus"
import Config from "./config"
import { Debug } from "../extensions/Debug"
import Image from "@tiptap/extension-image"
import { HEADING, PARAGRAPH } from "./nodes"

interface makeExtensionsProps {
    drawIoLink?: string,
    drawEnable?: boolean,
    tableEnable?: boolean
}

export default function makeExtensions(props: makeExtensionsProps) {
    var extensions = [
        // Debug,
        Document.extend({
            content: 'heading block*',
        }),
        Dropcursor,
        SmartQuote.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        SmartBulletList.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
            itemTypeName: 'listItem',
            keepMarks: false,
            keepAttributes: false,
        }),
        Bold.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        Code.configure({
            HTMLAttributes: {
                class: '',
            },
        }),
        SmartPre,
        Color.configure({
            types: ['textStyle'],
        }),
        CharacterCount,
        SmartImage.configure({
            drawIoLink: props.drawIoLink,
            allowBase64: true,
            HTMLAttributes: {
                class: 'smart-image'
            }
        }),
        // GroupPre,
        SmartFocus.configure({
            className: Config.focusClassName
        }),
        SmartHeading,
        History.configure({
            depth: 100,
        }),
        Highlight.configure({
            multicolor: true,
            HTMLAttributes: {
                class: 'my-custom-class',
            },
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
        // Ring,
        SmartParagraph,
        Padding,
        Placeholder.configure({
            placeholder: ({ node }) => {
                if (node.type.name === HEADING && node.attrs.level == 1) {
                    return '输入标题'
                }

                return ''
            }
        }),
        SmartSelection,
        SmartLink.configure({
            protocols: ['ftp', 'mailto'],
            autolink: true,
            openOnClick: true,
            linkOnPaste: true,
            HTMLAttributes: {
                class: 'link link-primary link-hover mx-1',
            },
        }),
        Strike.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        TaskItem.configure({
            nested: true,
        }),
        SmartTaskList,
        Text,
        // SmartTable,
        Table.configure({
            resizable: true,
            HTMLAttributes: {
                class: 'my-table',
                uuid: null
            },
        }),
        // TableRow,
        SmartTableRow,
        TableCell,
        // TableHeader,
        SmartTableHeader,
        // Toc,
        TextAlign.configure({
            types: [HEADING, PARAGRAPH],
        }),
        UUID,
        // Panel,
        // SmartHover
    ]

    return extensions
}