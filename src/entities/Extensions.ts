import Blockquote from "@tiptap/extension-blockquote"
import CharacterCount from "@tiptap/extension-character-count"
import Code from "@tiptap/extension-code"
import Collaboration from "@tiptap/extension-collaboration"
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
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { Document } from "@tiptap/extension-document"

interface makeExtensionsProps {
    drawIoLink?: string
}

const ydoc = new Y.Doc()
const provider = new WebrtcProvider('tiptap-collaboration-cursor-extension', ydoc)

function makeExtensions(props: makeExtensionsProps) {
    return [
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
        Collaboration.configure({
            document: ydoc,
        }),
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
        SmartDraw.configure({
            drawIoLink: props.drawIoLink,
            openDialog: 'click'
        }),
        Table.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        TableRow,
        TableCell,
        TableHeader,
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
 }

export default makeExtensions