import Editor from "../model/Editor"

interface EditorOptions {
    onBeforeCreate?: () => void
    onCreate?: (editor: Editor) => void
    onBooted?: (editor: Editor) => void
    onUpdate?: (editor: Editor) => void
    onContentError?: () => void
}

export default EditorOptions
