import { Editor } from '@tiptap/core'
import TiptapEditor from './TiptapEditor'

interface RootAgent {
    title: string
    editor: Editor | null
    onCreate: (editor: TiptapEditor) => void
    onBeforeCreate: () => void
    onContentError: () => void
    onUpdate: () => void
}

export default RootAgent
