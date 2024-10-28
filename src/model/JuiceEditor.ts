import TiptapEditor from './TiptapEditor'
import RootAgent from '../interface/RootAgent'
import EditorOptions from '../interface/EditorOptions'

class JuiceEditor implements RootAgent {
    private editor: TiptapEditor | null = null
    private options: EditorOptions

    constructor(options: EditorOptions) {
        this.options = options
    }

    public disableWebKit: () => void = () => {
        this.editor?.commands.disableWebKit()
    }

    public enableLog: () => void = () => {
        this.editor?.commands.enableLog()
    }

    public getContent: () => string = () => {
        return this.editor?.getHTML() || ''
    }

    public onBeforeCreate() {
        this.options.onBeforeCreate?.()
    }

    public onCreate(editor: TiptapEditor) {
        this.editor = editor
        this.options.onCreate?.(this)
    }

    public onContentError() {
        this.options.onContentError?.()
    }

    public onUpdate() {
        this.options.onUpdate?.(this)
    }

    public setContent(content: string) {
        this.editor?.commands.setContent(content, true)
    }

    public setTranslateApi(api: string) {
        this.editor?.commands.setTranslateApi(api)
    }

    public setContentFromLocalStorage() {
        this.editor?.commands.loadContentFromLocalStorage()
    }

    public setDrawLink(link: string) {
        this.editor?.commands.setDrawLink(link)
    }

    public toggleReadOnly() {
        this.editor?.setEditable(!this.editor?.isEditable)
    }

    public toggleSourceCode() {
        this.editor?.commands.toggleSourceCode()
    }

    public toggleToc() {
        this.editor?.commands.toggleToc()
    }
}

export default JuiceEditor
