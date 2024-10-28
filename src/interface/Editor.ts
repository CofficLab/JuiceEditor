interface Editor {
    /**
     * 禁用 WebKit 组件
     */
    disableWebKit: () => void

    /**
     * 获取编辑器内容
     * 
     * @returns 编辑器内容
     */
    getContent: () => string

    /**
     * 设置编辑器内容
     * 
     * @param content 编辑器内容
     */
    setContent: (content: string) => void

    /**
     * 从本地存储中获取内容，并设置为编辑器内容
     */
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

    /**
     * 切换只读模式
     */
    toggleReadOnly: () => void

    /**
     * 切换源码模式
     */
    toggleSourceCode: () => void

    /**
     * 切换目录模式
     */
    toggleToc: () => void
}