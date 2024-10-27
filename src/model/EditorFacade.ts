import RootVue from '../pages/Root.ce.vue' assert { type: 'ce-vue' }
import { createApp, defineCustomElement, h, provide } from "vue"
import TiptapEditor from './TiptapEditor'
import RootAgent from './RootAgent'

interface EditorFacadeOptions {
    onCreate?: (editor: EditorFacade) => void
    onBeforeCreate?: () => void
    onContentError?: () => void
    onUpdate?: (editor: EditorFacade) => void
}

const title = '🏭 EditorFacade'

class EditorFacade implements RootAgent {
    public editor: TiptapEditor | null = null
    public title = '🏭 EditorFacade'
    public options: EditorFacadeOptions

    constructor(options: EditorFacadeOptions) {
        this.options = options
    }

    public static register(label: string, options: EditorFacadeOptions): EditorFacade {
        console.log(title, 'register', label)

        const facade = new EditorFacade(options)
        customElements.define(label, defineCustomElement({
            setup() {
                provide('rootAgent', facade)
                const app = createApp(RootVue)
                app.config.errorHandler = (err) => {
                    console.error(err)
                }

                return () => h(RootVue)
            },
        }))

        return facade
    }

    public disableWebKit: () => void = () => {
        console.log(this.title, 'disableWebKit')
        this.editor?.commands.disableWebKit()
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
        console.log(this.title, 'setContent', content)
        this.editor?.commands.setContent(content)
    }

    public setTranslateApi(api: string) {
        console.log(this.title, 'setTranslateApi', api)
        this.editor?.commands.setTranslateApi(api)
    }

    public setContentFromLocalStorage() {
        console.log(this.title, 'setContentFromLocalStorage')
        this.editor?.commands.loadContentFromLocalStorage()
    }

    public setDrawLink(link: string) {
        console.log(this.title, 'setDrawLink', link)
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

export default EditorFacade
