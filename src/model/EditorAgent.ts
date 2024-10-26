import { Editor } from "@tiptap/vue-3"

const title = '👨‍💻 EditorAgent'

export default class EditorAgent {
    private editor: Editor

    constructor(editor: Editor) {
        this.editor = editor
    }

    disableEdit() {
        this.editor.setEditable(false)
    }

    disableWebKit() {
        this.editor.commands.disableWebKit()
    }

    disableWebKitVerbose() {
        this.editor.commands.disableWebKitVerbose()
    }

    disableLocalStorage() {
        this.editor.commands.disableLocalStorage()
    }

    disableLocalStorageVerbose() {
        console.log(title, 'disableLocalStorageVerbose')
        this.editor.commands.disableLocalStorageVerbose()
    }

    disableSourceCode() {
        this.editor.commands.hideSourceCode()
    }

    enableEdit() {
        this.editor.setEditable(true)
    }

    enableWebKit() {
        this.editor.commands.enableWebKit()
    }

    enableWebKitVerbose() {
        this.editor.commands.enableWebKitVerbose()
    }

    enableLocalStorage() {
        this.editor.commands.enableLocalStorage()
    }

    enableLocalStorageVerbose() {
        this.editor.commands.enableLocalStorageVerbose()
    }

    enableSourceCode() {
        this.editor.commands.showSourceCode()
    }

    /**
     * 获取编辑器中的HTML内容
     *
     * @returns 编辑器中的HTML内容字符串
     */
    getHtml() {
        return this.editor.getHTML()
    }

    onCreate(callback: () => any) {
        this.editor.on('create', callback)
    }

    onContentError(callback: (error: Error) => any) {
        this.editor.on('contentError', ({ editor, error, disableCollaboration }) => {
            // The editor content does not match the schema.
            callback(error)
        })
    }

    onDrop(callback: () => any) {
        this.editor.on('drop', callback)
    }

    onUpdate(callback: () => any) {
        this.editor.on('update', callback)
    }

    setContent(content: string) {
        this.editor.commands.setContent(content, true)
    }

    setContentFromWeb(url: string) {
        this.editor.commands.loadContentFromWeb(url)
    }

    setContentFromLocalStorage() {
        this.editor.commands.loadContentFromLocalStorage()
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
    setTranslateApi(api: string) {
        this.editor.commands.setTranslateApi(api)
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
    setDrawLink(link: string) {
        this.editor.commands.setDrawLink(link)
    }

    toggleToc() {
        this.editor.commands.toggleToc()
    }

    toggleReadOnly() {
        this.editor.setEditable(!this.editor.isEditable)
    }

    toggleSourceCode() {
        this.editor.commands.toggleSourceCode()
    }
}