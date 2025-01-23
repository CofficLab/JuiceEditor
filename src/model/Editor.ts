import { TiptapEditor } from './TiptapGroup'
import EditorOptions from '../interface/EditorOptions'
import { colors } from '../extensions/SmartMenus'
import EditorNode from './EditorNode'
import TocHeading from '../extensions/HeadingStore/TocHeading'
import { NodeStoreStorage } from '../extensions/NodeStore'
import { SmartHeadingStorage } from '../extensions/SmartHeading'
import { HeadingStoreStorage } from '../extensions/HeadingStore/HeadingStore'
import { LogStoreStorage } from '../extensions/LogStore'
import SmartLog from './SmartLog'
/**
 * 编辑器核心类
 * 
 * 提供编辑器的主要功能接口，包括内容管理、调试功能、状态控制等
 */
class Editor {
    public editor: TiptapEditor | null = null
    public options: EditorOptions

    constructor(options: EditorOptions) {
        this.options = options
    }

    /**
     * 创建一篇新文章
     * @param title 文章标题
     */
    public createArticle(title: string) {
        this.editor?.commands.createArticle(title)
    }

    public createImage() {
        this.editor?.commands.insertImage()
    }

    public createCodeBlock() {
        this.editor?.commands.insertSmartPre()
    }

    public disableEdit() {
        this.editor?.commands.setReadOnly(true)
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

    public disableHeadingStoreVerbose: () => void = () => {
        this.editor?.commands.disableHeadingStoreVerbose()
    }

    public disableURLListenerVerbose: () => void = () => {
        this.editor?.commands.disableURLListenerVerbose()
    }

    public disableNodeStoreVerbose: () => void = () => {
        this.editor?.commands.disableNodeStoreVerbose()
    }

    public disableTocVerbose: () => void = () => {
        this.editor?.commands.disableTocVerbose()
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

    public enableAllVerbose: () => void = () => {
        this.editor?.commands.enableAllVerbose()
    }

    public enableDocVerbose: () => void = () => {
        this.editor?.commands.enableDocVerbose()
    }

    public enableDebugBarVerbose: () => void = () => {
        this.editor?.commands.enableDebugBarVerbose()
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

    /**
     * 获取编辑器的日志记录
     * @returns 日志记录数组
     */
    public getLogs: () => SmartLog[] = () => {
        const logStore = this.editor?.storage.logStore as LogStoreStorage

        return logStore.logs
    }

    /**
     * 获取文档中的所有标题
     * @returns 标题节点数组
     */
    public getHeadings: () => TocHeading[] = () => {
        const smartHeading = this.editor?.storage.smartHeading as SmartHeadingStorage

        return (this.editor?.storage.headingStore as HeadingStoreStorage).tree.flatten() || []
    }

    /**
     * 获取当前文档的根节点
     * @returns 编辑器根节点
     */
    public getNode: () => EditorNode = () => {
        const nodeStore = this.editor?.storage.nodeStore as NodeStoreStorage

        return nodeStore.article
    }

    /**
     * 获取文档中的所有节点
     * @returns 节点数组
     */
    public getNodes: () => EditorNode[] = () => {
        const nodeStore = this.editor?.storage.nodeStore as NodeStoreStorage

        return nodeStore.article.flattened()
    }

    /**
     * 获取编辑器的 HTML 内容
     * @returns HTML 字符串
     */
    public getHTML: () => string = () => {
        return this.editor?.getHTML() || ''
    }

    public insertImage() {
        this.createImage()
    }

    public insertCodeBlock() {
        this.createCodeBlock()
    }

    public insertDraw() {
        this.insertDrawing()
    }

    public insertDrawing() {
        this.editor?.commands.insertDraw()
    }

    public insertTodo() {
        this.editor?.commands.toggleTaskList()
    }

    /**
     * 设置编辑器为只读模式
     */
    public setReadOnly: () => void = () => {
        this.editor?.setEditable(false)
    }

    /**
     * 设置编辑器为可编辑模式
     */
    public setEditable: () => void = () => {
        this.editor?.setEditable(true)
    }

    /**
     * 设置编辑器的 HTML 内容
     * @param HTML HTML 字符串
     */
    public setHTML(HTML: string) {
        this.editor?.commands.setContent(HTML, true)
    }

    /**
     * 设置编辑器内容
     * @param content 要设置的内容
     */
    public setContent(content: string) {
        this.setHTML(content)
    }

    /**
     * 设置菜单背景颜色
     * @param colorName 颜色名称
     */
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

    /**
     * 从本地存储加载内容
     */
    public setContentFromLocalStorage() {
        this.editor?.commands.setContentFromLocalStorage()
    }

    /**
     * 从指定 URL 加载内容
     * @param url 内容的 URL 地址
     * @param uuid 唯一标识符
     */
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

    public toggleBold() {
        this.editor?.commands.toggleBold()
    }

    public toggleItalic() {
        this.editor?.commands.toggleItalic()
    }

    /**
     * 切换编辑器的只读状态
     */
    public toggleReadOnly() {
        this.editor?.commands.toggleReadOnly()
    }

    /**
     * 切换源代码视图
     */
    public toggleSourceCode() {
        this.editor?.commands.toggleSourceCode()
    }

    /**
     * 切换目录显示
     */
    public toggleToc() {
        this.editor?.commands.toggleToc()
    }

    /**
     * 切换目录显示（别名）
     * @deprecated 请使用 toggleToc() 方法
     */
    public toggleTOC() {
        this.toggleToc()
    }

    /**
     * 切换调试栏显示
     */
    public toggleDebugBar() {
        this.editor?.commands.toggleDebugBar()
    }
}

export default Editor
