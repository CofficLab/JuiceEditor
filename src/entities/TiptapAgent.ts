import { Editor } from '@tiptap/vue-3'
import makeExtensions from './Extensions'
import EditorData from './EditorData'

interface Props {
    content: string
    editable: boolean
    onUpdate: (data: EditorData) => void
    drawIoLink?: string
}

class TiptapAgent {
    static create(props: Props): Editor {
        return new Editor({
            extensions: makeExtensions({
                drawIoLink: props.drawIoLink,
            }),
            autofocus: true,
            content: props.content,
            editable: props.editable,
            onUpdate: ({ editor }) => {
                let editorData = EditorData.fromEditor(editor)
                if (props.onUpdate) {
                    console.log('TiptapEditor: onUpdate, callback with TreeNode')
                    props.onUpdate(editorData)
                } else {
                    console.log('TiptapEditor: onUpdate, no callback')
                }
            }
        })
    }
}

export default TiptapAgent