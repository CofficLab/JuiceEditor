import { defineStore } from "pinia";
import LocalApp from "../plugins/LocalNodeApp"
import WebKit from "../plugins/WebKit"
import EventPlugin from "../plugins/EventPlugin";
import UrlListener from "../listeners/UrlListener";
import EventListener from "../listeners/EventListener";
import SlotListener from "../listeners/SlotListener";
import CharacterCount from "@tiptap/extension-character-count"
import Code from "@tiptap/extension-code"
import Color from "@tiptap/extension-color"
import History from "@tiptap/extension-history"
import Italic from "@tiptap/extension-italic"
import ListItem from "@tiptap/extension-list-item"
import Strike from "@tiptap/extension-strike"
import Dropcursor from '@tiptap/extension-dropcursor'
import Table from "@tiptap/extension-table"
import Highlight from "@tiptap/extension-highlight"
import TableCell from "@tiptap/extension-table-cell"
import TaskItem from "@tiptap/extension-task-item"
import Text from "@tiptap/extension-text"
import TextAlign from '@tiptap/extension-text-align'
import SmartHeading from "../extensions/SmartHeading/SmartHeading"
import SmartTaskList from "../extensions/SmartTaskList/SmartTaskList"
import SmartPre from "../extensions/SmartPre/SmartPre"
import SmartImage from "../extensions/SmartImage/SmartImage"
import SmartLink from "../extensions/SmartLink/SmartLink"
import SmartParagraph from "../extensions/SmartParagraph/SmartParagraph"
import SmartBulletList from "../extensions/SmartBulletList/SmartBulletList"
import SmartQuote from "../extensions/SmartQuote/SmartQuote"
import SmartTableHeader from "../extensions/SmartTableHeader/SmartTableHeader"
import SmartTableRow from "../extensions/SmartTableRow/SmartTableRow"
import TableRow from "@tiptap/extension-table-row"
import TableHeader from "@tiptap/extension-table-header"
import SmartSelection from "../extensions/SmartSelection"
import { Padding } from "../extensions/Padding"
import { SmartFocus } from "../extensions/SmartFocus"
import { Branch } from "../extensions/Branch/Branch"
import { BranchContent } from "../extensions/BranchContent/BranchContent"
import { Root } from "../extensions/Root/Root"
import { Toc } from "../extensions/Toc/Toc"
import ApiApp from "../plugins/APIApp"
import { NewLine } from "../extensions/NewLine"
import { Debug } from "../extensions/Debug"
import SmartDoc from "../extensions/SmartDoc"
import SmartBold from "../extensions/SmartBold"
import SmartPlaceholder from "../extensions/SmartPlaceholder"
import { HEADING, PARAGRAPH, ROOT, TOC } from "../config/nodes"
import { Margin } from "../extensions/Margin"

interface makeExtensionsProps {
    drawIoLink: string,
    drawEnable?: boolean,
    tableEnable?: boolean,
    translateApi: string,
    focusClassName: string
}

const title = "🔧 ConfigStore"
const isDebug = process.env.NODE_ENV === 'development'
const editorLabel = 'juice-editor'
const defaultTranslateApi = isDebug
    ? 'http://127.0.0.1/api/translate'
    : 'http://127.0.0.1:49493/api/translate'
const defaultFocusClassName = 'focused'
const defaultDrawIoLink = isDebug
    ? '/drawio/webapp/index.html?'
    : '/drawio/index.html?'
const defaultMonacoLink = isDebug
    ? '/monaco/index.html'
    : '/editor/monaco/index.html'

export const useConfigStore = defineStore('config-store', {
    state: () => {
        return {
            updatedAt: new Date(),
            drawLink: defaultDrawIoLink,
            monacoLink: defaultMonacoLink,
            translateApi: defaultTranslateApi,
            focusClassName: defaultFocusClassName,
            plugins: [
                ('webkit' in window) ? new WebKit() : new LocalApp(),
                new EventPlugin(),
                new ApiApp()
            ],
            listeners: [
                new UrlListener(editorLabel),
                new EventListener(),
                new SlotListener(editorLabel)
            ],
        }
    },

    actions: {
        setTranslateApi(api: string) {
            let verbose = false

            if (verbose) {
                console.log(`${title}.setTranslateApi(${api})`)
            }

            if (this.translateApi === api) {
                return
            }

            this.translateApi = api
            this.updatedAt = new Date()
        },

        setDrawIoLink(url: string) {
            let verbose = true

            if (verbose) {
                console.log(`${title}.setDrawIoLink(${url})`)
            }

            if (this.drawLink === url) {
                return
            }

            this.drawLink = url
            this.updatedAt = new Date()
        },

        getExtensions() {
            return makeExtensions({
                translateApi: this.translateApi,
                focusClassName: this.focusClassName,
                drawIoLink: this.drawLink,
            })
        }
    }
})

function makeExtensions(props: makeExtensionsProps) {
    var extensions = [
        Debug,
        Root.extend({
            content: `${HEADING} block*`,
        }),
        Branch,
        BranchContent,
        SmartDoc,
        Dropcursor,
        Margin,
        SmartQuote.configure({
            HTMLAttributes: {
                class: 'quote-class',
            },
        }),
        SmartBulletList.configure({
            HTMLAttributes: {
                class: 'bullet-list-class',
            },
            itemTypeName: 'listItem',
            keepMarks: false,
            keepAttributes: false,
        }),
        SmartBold,
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
            className: props.focusClassName,
            mode: 'all',
            excludeNodes: [ROOT, TOC]
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
        SmartParagraph.configure({
            translateApi: props.translateApi,
        }),
        Padding,
        NewLine,
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
        Table.configure({
            resizable: true,
            HTMLAttributes: {
                class: 'my-table',
                uuid: null
            },
        }),
        TableRow,
        // SmartTableRow,
        TableCell,
        TableHeader,
        // SmartTableHeader,
        Toc,
        TextAlign.configure({
            types: [HEADING, PARAGRAPH],
        }),
        // UUID.configure({
        //     attributeName: 'uuid',
        //     types: [PARAGRAPH, HEADING, PRE, TASKLIST, IMAGE, TABLE, A]
        // }),
        // Panel,
        // SmartHover
    ]

    return extensions
}

export type ConfigStore = ReturnType<typeof useConfigStore>
