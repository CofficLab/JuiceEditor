import { Editor as EditorVue } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import EditorData from '../model/EditorData';
import Heading from '@tiptap/extension-heading';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import Link from '@tiptap/extension-link';
import Strike from '@tiptap/extension-strike';

const title = '📒 TiptapHelper'

interface Props {
    content: string
    editable: boolean
    onCreate: (data: EditorData | Error, editor: Editor) => void
    onUpdate: (data: EditorData | Error) => void
    onSelectionUpdate?: (type: string) => void
    drawEnable: boolean
    tableEnable: boolean
    extensions: any
}

class TiptapHelper {
    // 别处传递给editor的content可能是html字符串，也可能是json字符串，这里确保是正确的
    // static getValidContent(content: string): object | string {
    //     let verbose = false;
    //     if (verbose) {
    //         console.log(title, 'getValidContent')
    //     }

    //     if (content == '') {
    //         if (verbose) {
    //             console.log(title, 'IS EMPTY')
    //         }

    //         return ''
    //     }

    //     // 尝试解析成json
    //     try {
    //         let jsonObject = JSON.parse(content)

    //         if (verbose) {
    //             console.log(title, 'IS JSON')
    //         }

    //         return jsonObject
    //     } catch (e) {
    //         if (verbose) {
    //             console.log(title, 'Not JSON, As HTML')
    //         }

    //         return content
    //     }
    // }

    // static checkBlockUUID(editor: Editor): Error[] {
    //     let typesWithoutUUID = [
    //         'text',
    //         'tableRow',
    //         'tableHeader',
    //         'tableCell',
    //         'taskItem',
    //         'toc',
    //     ]

    //     var errors: Error[] = []

    //     // 检查每一个node，没有uuid属性则抛出异常
    //     editor.state.doc.descendants((node, pos) => {
    //         if (!typesWithoutUUID.includes(node.type.name) && !node.attrs.uuid) {
    //             // console.error(node)
    //             // errors.push(new Error(`Node [${node.type.name}] has no uuid`))
    //             // console.warn('Node has no uuid', node)
    //         }
    //     })

    //     return errors
    // }
}

export default TiptapHelper

