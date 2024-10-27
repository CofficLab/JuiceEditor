import { createApp, defineCustomElement, h, onMounted, provide } from "vue"
import RootVue from '../pages/Root.ce.vue' assert { type: 'ce-vue' }
import { Editor } from '@tiptap/core'
import RootAgent from "./RootAgent"

const defaultLabel = 'juice-editor'

class EditorFactory implements RootAgent {
    public title = '🏭 EditorFactory'
    public label: string = defaultLabel
    public editor: Editor | null = null
    public onCreateCallback: Function = () => { }
    public onBeforeCreateCallback: Function = () => { }
    public onContentErrorCallback: Function = () => { }
    public onUpdateCallback: Function = () => { }

    public getLogTitle: () => string = () => `${this.title}(${this.label})`

    public disableEdit: () => void = () => {
        console.log(this.getLogTitle(), 'disableEdit')
        this.editor?.setEditable(false)
    }

    public disableWebKit: () => void = () => {
        console.log(this.getLogTitle(), 'disableWebKit')
        this.editor?.commands.disableWebKit()
    }

    public getContent(): string {
        console.log(this.getLogTitle(), 'getContent')
        return this.editor?.getHTML() || ''
    }

    public onBeforeCreate(callback: Function) {
        this.onBeforeCreateCallback = callback
    }

    public onContentError(callback: Function) {
        this.onContentErrorCallback = callback
    }

    public onCreate(callback: Function) {
        this.onCreateCallback = callback
    }

    public register(label: string = defaultLabel) {
        this.label = label
        console.log(this.getLogTitle(), 'register')

        const factory = this
        customElements.define(label, defineCustomElement({
            setup() {
                provide('rootAgent', factory)
                const app = createApp(RootVue)
                app.config.errorHandler = (err) => {
                    console.error(err)
                }

                return () => h(RootVue)
            },
        }))
    }

    public setContent(content: string) {
        console.log(this.getLogTitle(), 'setContent', content)
        this.editor?.commands.setContent(content)
    }

    public setContentFromLocalStorage() {
        console.log(this.getLogTitle(), 'setContentFromLocalStorage')
        this.editor?.commands.loadContentFromLocalStorage()
    }

    public setDrawLink(link: string) {
        console.log(this.getLogTitle(), 'setDrawLink', link)
        this.editor?.commands.setDrawLink(link)
    }

    public setEditable(editable: boolean) {
        console.log(this.getLogTitle(), 'setEditable', editable)
        this.editor?.setEditable(editable)
    }

    public setEditor(editor: Editor) {
        console.log(this.getLogTitle(), 'setEditor')
        this.editor = editor
    }

    public setTranslateApi(api: string) {
        console.log(this.getLogTitle(), 'setTranslateApi', api)
        this.editor?.commands.setTranslateApi(api)
    }

    public toggleReadOnly() {
        console.log(this.getLogTitle(), 'toggleReadOnly')
        this.editor?.setEditable(!this.editor?.isEditable)
    }

    public toggleSourceCode() {
        console.log(this.getLogTitle(), 'toggleSourceCode')
        this.editor?.commands.toggleSourceCode()
    }

    public toggleToc() {
        console.log(this.getLogTitle(), 'toggleToc')
        this.editor?.commands.toggleToc()
    }
}

export default EditorFactory
