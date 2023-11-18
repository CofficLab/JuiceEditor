import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
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

interface Props {
    content: string
    editable: boolean
    onUpdate: (treeNode: TreeNode) => void
    drawIoLink?: string
}

class TiptapAgent {
    static create(props: Props): Editor {
        return new Editor({
            extensions: [
                CodeEditor,
                CharacterCount,
                SmartBanner,
                SmartDraw.configure({
                    drawIoLink: props.drawIoLink,
                    openDialog: 'click'
                }),
                Toc,
                SmartImage.configure({
                    allowBase64: true,
                    HTMLAttributes: {
                        class: ''
                    }
                }),
                Document.extend({
                    content: 'heading block*'
                }),
                StarterKit.configure({
                    document: false,
                    codeBlock: false
                }),
                Placeholder.configure({
                    placeholder: ({ node }) => {
                        if (node.type.name === 'heading' && node.attrs.level == 1) {
                            return '输入标题'
                        }

                        return ''
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
                })
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