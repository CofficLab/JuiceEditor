import { Editor } from '@tiptap/core'
import TiptapEditor from '../model/TiptapEditor'

interface RootAgent {
    onCreate: (editor: TiptapEditor) => void
    onBeforeCreate: () => void
    onContentError: () => void
    onUpdate: () => void
}

export default RootAgent
