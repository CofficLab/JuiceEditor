import EditorOptions from './EditorOptions'

/**
 * 编辑器工厂
 */
interface EditorFactory {
    /**
     * 注册编辑器
     * 
     * @param label 编辑器标签
     * @param options 编辑器配置
     * @returns 编辑器实例
     */
    register: (label: string, options: EditorOptions) => Editor
}

export default EditorFactory