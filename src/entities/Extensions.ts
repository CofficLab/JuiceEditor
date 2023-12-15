import Blockquote from "@tiptap/extension-blockquote"
import CharacterCount from "@tiptap/extension-character-count"
import Code from "@tiptap/extension-code"
import Placeholder from "@tiptap/extension-placeholder"
import Table from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import { StarterKit } from "@tiptap/starter-kit"
import { CodeEditor } from "../extensions/CodeEditor/CodeEditor"
import { SmartBanner } from "../extensions/SmartBanner/SmartBanner"
import SmartDraw from "../extensions/SmartDraw/SmartDraw"
import SmartImage from "../extensions/SmartImage/SmartImage"
import SmartLink from "../extensions/SmartLink/SmartLink"
import { Toc } from "../extensions/Toc/Toc"
import { Document } from "@tiptap/extension-document"
import { SmartTableView } from "../extensions/SmartTable/SmartTableView"
import SmartTable from "../extensions/SmartTable/SmartTable"
import SmartTableCell from "../extensions/SmartTableCell/SmartTableCell"
import SmartTableRow from "../extensions/SmartTableRow/SmartTableRow"

interface makeExtensionsProps {
    drawIoLink?: string,
    drawEnable?: boolean,
    tableEnable?: boolean
}

function makeExtensions(props: makeExtensionsProps) {
    var extensions = [
        StarterKit.configure({
            document: false,
            codeBlock: false,
            history: false,
            blockquote: false,
            code: false,
        }),
        Blockquote.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        Code.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        CodeEditor,
        CharacterCount,
        Document.extend({
            content: 'heading block*'
        }),
        Placeholder.configure({
            placeholder: ({ node }) => {
                if (node.type.name === 'heading' && node.attrs.level == 1) {
                    return '输入标题'
                }

                return ''
            }
        }),
        SmartBanner,
        SmartImage.configure({
            allowBase64: true,
            HTMLAttributes: {
                class: ''
            }
        }),
        SmartLink.configure({
            protocols: ['ftp', 'mailto'],
            autolink: true,
            openOnClick: true,
            linkOnPaste: true,
            HTMLAttributes: {
                class: 'link link-primary link-hover mx-1',
            },
        }),
        TaskItem.configure({
            nested: true,
        }),
        TaskList.configure({
            HTMLAttributes: {
                class: 'my-task-class',
            },
        }),
        Toc
    ]

    if (props.drawEnable) {
        extensions.push(
            SmartDraw.configure({
                drawIoLink: props.drawIoLink,
                openDialog: 'click'
            })
        );
    }

    if (props.tableEnable) {
        extensions.push(
            SmartTable.configure({
                resizable: true,
                // @ts-ignore
                View: SmartTableView,
                HTMLAttributes: {
                    class: 'smart-table',
                },
            }),
            SmartTableRow,
            TableCell,
            TableHeader
        );
    }

    return extensions
 }

export default makeExtensions