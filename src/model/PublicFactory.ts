interface PublicEditorFactory {
    disableWebKit: () => void
    getContent: () => string
    onBeforeCreate: (callback: Function) => void
    onContentError: (callback: (error: Error) => void) => void
    onCreate: (callback: (Function)) => void
    register: (label: string) => void
    setContent: (content: string) => void
    setContentFromLocalStorage: () => void

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
    setDrawLink: (link: string) => void

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
    setTranslateApi: (api: string) => void
    toggleReadOnly: () => void
    toggleSourceCode: () => void
    toggleToc: () => void
}