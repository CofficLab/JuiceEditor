import { TiptapEditor } from './TiptapGroup'
import EditorOptions from '../interface/EditorOptions'
import { colors } from '../extensions/SmartMenus'
import EditorNode from './EditorNode'
import TocHeading from '../extensions/HeadingStore/TocHeading'
import { NodeStoreStorage } from '../extensions/NodeStore'
import { SmartHeadingStorage } from '../extensions/SmartHeading'
import { HeadingStoreStorage } from '../extensions/HeadingStore/HeadingStore'

class Editor {
    public editor: TiptapEditor | null = null
    public options: EditorOptions

    constructor(options: EditorOptions) {
        this.options = options
    }

    public createArticle(title: string) {
        this.editor?.commands.createArticle(title)
    }

    public disableWebKit: () => void = () => {
        this.editor?.commands.disableWebKit()
    }

    public disableSlotListener: () => void = () => {
        this.editor?.commands.disableSlotListener()
    }

    public disableLocalStorage: () => void = () => {
        this.editor?.commands.disableLocalStorage()
    }

    public disableLocalStorageVerbose: () => void = () => {
        this.editor?.commands.disableLocalStorageVerbose()
    }

    public disableWebKitVerbose: () => void = () => {
        this.editor?.commands.disableWebKitVerbose()
    }

    public disableDebugBar: () => void = () => {
        this.editor?.commands.disableDebugBar()
    }

    public disableWebKitSendNodes: () => void = () => {
        this.editor?.commands.disableWebKitSendNodes()
    }

    public disableCodeBlockVerbose: () => void = () => {
        this.editor?.commands.disableCodeBlockVerbose()
    }

    public disableDocVerbose: () => void = () => {
        this.editor?.commands.disableDocVerbose()
    }

    public disableSmartSelectionVerbose: () => void = () => {
        this.editor?.commands.disableSmartSelectionVerbose()
    }

    public disableURLListenerVerbose: () => void = () => {
        this.editor?.commands.disableURLListenerVerbose()
    }

    public disableArticleVerbose: () => void = () => {
        this.editor?.commands.disableArticleVerbose()
    }

    public disableImageVerbose: () => void = () => {
        this.editor?.commands.disableImageVerbose()
    }

    public disableAssistantVerbose: () => void = () => {
        this.editor?.commands.disableAssistantVerbose()
    }

    public enableDebugBar: () => void = () => {
        this.editor?.commands.enableDebugBar()
    }

    public enableVerboseMode: () => void = () => {
        this.editor?.commands.enableVerboseMode()
    }

    public enableDocVerbose: () => void = () => {
        this.editor?.commands.enableDocVerbose()
    }

    public enableArticleVerbose: () => void = () => {
        this.editor?.commands.enableArticleVerbose()
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

    public enableLocalStorage: () => void = () => {
        this.editor?.commands.enableLocalStorage()
    }

    public enableLocalStorageVerbose: () => void = () => {
        this.editor?.commands.enableLocalStorageVerbose()
    }

    public enableLocalStoragePrintDocNode: () => void = () => {
        this.editor?.commands.enableLocalStoragePrintDocNode()
    }

    public getHeadings: () => TocHeading[] = () => {
        const smartHeading = this.editor?.storage.smartHeading as SmartHeadingStorage

        return (this.editor?.storage.headingStore as HeadingStoreStorage).tree.flatten() || []
    }

    public getNode: () => EditorNode = () => {
        const nodeStore = this.editor?.storage.nodeStore as NodeStoreStorage

        return nodeStore.article
    }

    public getNodes: () => EditorNode[] = () => {
        const nodeStore = this.editor?.storage.nodeStore as NodeStoreStorage

        return nodeStore.article.flattened()
    }

    public getHTML: () => string = () => {
        return this.editor?.getHTML() || ''
    }

    public setReadOnly: () => void = () => {
        this.editor?.setEditable(false)
    }

    public setEditable: () => void = () => {
        this.editor?.setEditable(true)
    }

    public setHTML(HTML: string) {
        this.editor?.commands.setContent(HTML, true)
    }

    public setContent(content: string) {
        this.setHTML(content)
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

    public setLocalStorageVerbose(value: boolean) {
        this.editor?.commands.setLocalStorageVerbose(value)
    }

    public setWebKitVerbose(value: boolean) {
        this.editor?.commands.setWebKitVerbose(value)
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
        this.editor?.commands.toggleReadOnly()
    }

    public toggleSourceCode() {
        this.editor?.commands.toggleSourceCode()
    }

    public toggleToc() {
        this.editor?.commands.toggleToc()
    }

    public toggleTOC() {
        this.toggleToc()
    }

    public toggleDebugBar() {
        this.editor?.commands.toggleDebugBar()
    }
}

export default Editor
