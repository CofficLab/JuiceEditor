import RootVue from '../pages/Root.ce.vue' assert { type: 'ce-vue' }
import { createApp, defineCustomElement, h, provide } from "vue"
import JuiceEditor from './JuiceEditor'
import EditorOptions from '../interface/EditorOptions'

const title = '🏭 EditorFactory'

class JuiceEditorFactory {
    public static register(label: string, options: EditorOptions = {}): Editor {
        console.log(title, 'register', label)

        const editor = new JuiceEditor(options)

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

        return editor as Editor
    }
}

export default JuiceEditorFactory