import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import Collaboration from '@tiptap/extension-collaboration'
import { CodeEditor } from '../extensions/CodeEditor/CodeEditor'
import { Toc } from '../extensions/Toc/Toc.js'
import SmartImage from '../extensions/SmartImage/SmartImage'
import { Editor } from '@tiptap/vue-3'
import { Editor as TiptapEditor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import SmartDraw from '../extensions/SmartDraw/SmartDraw'
import { SmartBanner } from '../extensions/SmartBanner/SmartBanner'
import TreeNode from '../entities/TreeNode'
import SmartLink from '../extensions/SmartLink/SmartLink'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

const ydoc = new Y.Doc()

interface Props {
    content: string
    editable: boolean
    onUpdate: (treeNode: TreeNode) => void
    drawIoLink?: string
}

const provider = new WebrtcProvider('tiptap-collaboration-cursor-extension', ydoc)

class TiptapAgent {
    static create(props: Props): Editor {
        return new Editor({
            extensions: [
                StarterKit.configure({
                    document: false,
                    codeBlock: false,
                    history: false
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
                TaskItem.configure({
                    nested: true,
                }),
                TaskList.configure({
                    HTMLAttributes: {
                        class: 'my-task-class',
                    },
                }),
                Toc
            ],
            autofocus: true,
            content: props.content,
            editable: props.editable,
            onUpdate: ({ editor }) => {
                let treeNode = TiptapAgent.getTreeNodeFromEditor(editor)
                if (props.onUpdate) {
                    console.log('TiptapEditor: onUpdate, callback with TreeNode')
                    props.onUpdate(treeNode)
                } else {
                    console.log('TiptapEditor: onUpdate, no callback')
                }
            }
        })
    }

    static getTreeNodeFromEditor(editor: TiptapEditor): TreeNode {
        let nodes = editor.state.doc.content
        let title = ''
        nodes.forEach((node) => {
            if (node.type.name == 'heading' && title == '') {
                title = node.textContent!
            }
        })

        return new TreeNode({
            title: title,
            content: editor.getHTML(),
            characterCount: editor.storage.characterCount.characters(),
            wordCount: editor.storage.characterCount.words()
        })
    }
}

export default TiptapAgent