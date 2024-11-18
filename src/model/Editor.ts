import { TiptapEditor } from './TiptapGroup'
import EditorOptions from '../interface/EditorOptions'
import { colors } from '../extensions/SmartMenus'

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

    public enableWebKitVerbose: () => void = () => {
        this.editor?.commands.enableWebKitVerbose()
    }

    public enableSlotListener: () => void = () => {
        this.editor?.commands.enableSlotListener()
    }

    public enableSmartNodesVerbose: () => void = () => {
        this.editor?.commands.enableSmartNodesVerbose()
    }

    public enableLocalStorage: () => void = () => {
        this.editor?.commands.enableLocalStorage()
    }

    public enableLocalStorageVerbose: () => void = () => {
        this.editor?.commands.enableLocalStorageVerbose()
    }

    public enableLocalStoragePrintDocNode: () => void = () => {
        this.editor?.commands.enableLocalStoragePrintDocNode()
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
        this.editor?.commands.setDocContent(content)
    }

    public setMenuBackgroundColor(colorName: keyof typeof colors) {
        this.editor?.commands.setMenuBackgroundColor(colorName)
    }

    /**
     * 设置聊天API接口地址
     * 
     * 在需要聊天时，编辑器会向该地址发送 HTTP POST 请求
     * 
     * 请求参数：
     * 
     * { text: content }
     * 
     * 返回值：聊天结果
     * 
     * @param api 聊天API接口地址
     * @example editor.setChatApi('https://api.youdao.com/api/chat')
     */
    public setChatApi(api: string) {
        this.editor?.commands.setChatApi(api)
    }

    public setContentFromLocalStorage() {
        this.editor?.commands.setContentFromLocalStorage()
    }

    public setContentFromUrl(url: string, uuid: string) {
        this.editor?.commands.setContentFromWeb(url, uuid)
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
