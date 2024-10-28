import RootVue from '../pages/Root.ce.vue' assert { type: 'ce-vue' }
import { createApp, defineCustomElement, h, provide } from "vue"
import Editor from './Editor'
import EditorOptions from '../interface/EditorOptions'

const title = '🏭 EditorFactory'

class EditorFactory {
    /**
     * 注册编辑器
     * 
     * @param label 编辑器标签
     * @param options 编辑器配置
     * @returns 编辑器实例
     */
    public static register(label: string, options: EditorOptions = {}): Editor {
        console.log(title, 'register', label)

        const editor = new Editor(options)

        customElements.define(label, defineCustomElement({
            setup() {
                provide('rootAgent', editor)
                const app = createApp(RootVue)
                app.config.errorHandler = (err) => {
                    console.error(err)
                }

                return () => h(RootVue)
            },
        }))

        return editor
    }
}

export default EditorFactory