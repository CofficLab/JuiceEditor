import Editor from "../model/JuiceEditor"

interface EditorOptions {
    onCreate?: (editor: Editor) => void
    onBeforeCreate?: () => void
    onContentError?: () => void
    onUpdate?: (editor: Editor) => void
}

export default EditorOptions
