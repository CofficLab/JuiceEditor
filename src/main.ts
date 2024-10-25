import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import { defineCustomElement } from 'vue'
import tiptapEditor from './editor'
import EditorAgent from './model/EditorAgent'
import RootVue from './pages/Root.ce.vue' assert { type: 'ce-vue' }

const editorLabel = 'juice-editor'

customElements.define(editorLabel, defineCustomElement({
    setup() {
        provide('editor', tiptapEditor)
        const app = createApp(RootVue)
        app.use(createPinia())
        app.config.errorHandler = (err) => {
            console.error(err)
        }

        return () => h(RootVue)
    },
}))

const editor = new EditorAgent(tiptapEditor)

export default editor