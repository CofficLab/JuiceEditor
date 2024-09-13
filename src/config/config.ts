import LocalApp from "../plugins/LocalNodeApp"
import WebKit from "../plugins/WebKit"
import Plugin from "../contract/Plugin";
import EventPlugin from "../plugins/EventPlugin";
import UrlListener from "../listeners/UrlListener";
import EventListener from "../listeners/EventListener";
import SlotListener from "../listeners/SlotListener";
import Listener from "../contract/Listener";
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
import Table from "@tiptap/extension-table"
import Highlight from "@tiptap/extension-highlight"
import TableCell from "@tiptap/extension-table-cell"
import TaskItem from "@tiptap/extension-task-item"
import Text from "@tiptap/extension-text"
import TextAlign from '@tiptap/extension-text-align'
import { Document } from "@tiptap/extension-document"
import SmartHeading from "../extensions/SmartHeading/SmartHeading"
import SmartTaskList from "../extensions/SmartTaskList/SmartTaskList"
import SmartPre from "../extensions/SmartPre/SmartPre"
import SmartImage from "../extensions/SmartImage/SmartImage"
import SmartLink from "../extensions/SmartLink/SmartLink"
import SmartParagraph from "../extensions/SmartParagraph/SmartParagraph"
import SmartBulletList from "../extensions/SmartBulletList/SmartBulletList"
import SmartQuote from "../extensions/SmartQuote/SmartQuote"
import UUID from "../extensions/UUID/UUID"
import SmartTableHeader from "../extensions/SmartTableHeader/SmartTableHeader"
import SmartTableRow from "../extensions/SmartTableRow/SmartTableRow"
import SmartSelection from "../extensions/SmartSelection"
import { Padding } from "../extensions/Padding"
import { SmartFocus } from "../extensions/SmartFocus"
import { A, HEADING, IMAGE, PARAGRAPH, PRE, TABLE, TASKLIST } from "./nodes"

interface ConfigType {
    editorLabel: string;
    isDebug: boolean;
    monacoLink: string;
    plugins: Plugin[];
    listeners: Listener[];
    focusClassName: string;
    extensions: any
}

const isDebug = process.env.NODE_ENV === 'development'
const focusClassName = 'focused'
const drawLink = isDebug
    ? '/drawio/webapp/index.html?'
    : '/drawio/index.html?'

const Config: ConfigType = {
    'editorLabel': 'juice-editor',
    'isDebug': isDebug,
    'monacoLink': isDebug
        ? '/monaco/index.html'
        : '/editor/monaco/index.html',
    'plugins': [
        ('webkit' in window) ? new WebKit() : new LocalApp(),
        new EventPlugin()
    ],
    listeners: [
        new UrlListener(),
        new EventListener(),
        new SlotListener()
    ],
    'focusClassName': focusClassName,
    extensions: makeExtensions({
        drawIoLink: drawLink,
        drawEnable: true,
        tableEnable: true
    })
}

interface makeExtensionsProps {
    drawIoLink?: string,
    drawEnable?: boolean,
    tableEnable?: boolean
}

function makeExtensions(props: makeExtensionsProps) {
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
            className: focusClassName,
            mode: 'shallowest'
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
        UUID.configure({
            types: [PARAGRAPH, HEADING, PRE, TASKLIST, IMAGE, TABLE, A]
        }),
        // Panel,
        // SmartHover
    ]

    return extensions
}

export default Config