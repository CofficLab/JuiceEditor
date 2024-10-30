import { TiptapEditor } from './TiptapGroup'
import EditorOptions from '../interface/EditorOptions'

class Editor {
    public editor: TiptapEditor | null = null
    public options: EditorOptions

    constructor(options: EditorOptions) {
        this.options = options
    }

    public disableWebKit: () => void = () => {
        this.editor?.commands.disableWebKit()
    }

    public disableSlotListener: () => void = () => {
        this.editor?.commands.disableSlotListener()
    }

    public enableLog: () => void = () => {
        this.editor?.commands.enableLog()
    }

    public enableWebKit: () => void = () => {
        this.editor?.commands.enableWebKit()
    }

    public enableSlotListener: () => void = () => {
        this.editor?.commands.enableSlotListener()
    }

    public enableLocalStorage: () => void = () => {
        this.editor?.commands.enableLocalStorage()
    }

    public getContent: () => string = () => {
        return this.editor?.getHTML() || ''
    }

    public setReadOnly: () => void = () => {
        this.editor?.setEditable(false)
    }

    public setEditable: () => void = () => {
        this.editor?.setEditable(true)
    }

    public setContent(content: string) {
        this.editor?.commands.setContent(content, true)
    }

    /**
     * 设置翻译API接口地址
     * 
     * 在需要翻译时，编辑器会向该地址发送 HTTP POST 请求
     * 
     * 请求参数：
     * 
     * { lang: language, text: content }
     * 
     * 返回值：翻译后的文本
     * @param api 翻译API接口地址
     * @example editor.setTranslateApi('https://api.youdao.com/api')
     */
    public setTranslateApi(api: string) {
        this.editor?.commands.setTranslateApi(api)
    }

    public setContentFromLocalStorage() {
        this.editor?.commands.setContentFromLocalStorage()
    }

    public setContentFromUrl(url: string) {
        this.editor?.commands.setContentFromWeb(url)
    }

    /**
     * 设置画图链接
     * 
     * 在需要画图时，编辑器会加载该链接的页面
     * 
     * 详细文档：https://cofficlab.github.io/en/juiceEditor/documents/components/image.html#draw-a-picture
     * 
     * @param link 画图链接
     * @example editor.setDrawLink('https://embeded.draw.io')
     */
    public setDrawLink(link: string) {
        this.editor?.commands.setDrawLink(link)
    }

    public toggleReadOnly() {
        this.editor?.setEditable(!this.editor?.isEditable, true)
    }

    public toggleSourceCode() {
        this.editor?.commands.toggleSourceCode()
    }

    public toggleToc() {
        this.editor?.commands.toggleToc()
    }
}

export default Editor
