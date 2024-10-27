import { Editor } from '@tiptap/core'

interface RootAgent {
    title: string
    editor: Editor | null
    onCreateCallback: Function
    onBeforeCreateCallback: Function
    onContentErrorCallback: Function
    onUpdateCallback: Function
}

export default RootAgent
