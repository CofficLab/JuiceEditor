import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defineCustomElement } from 'vue'
import Root from './pages/Root.ce.vue'

export function defineJuiceEditor() {
    let pinia = createPinia()
    let app = createApp(Root)

    app.use(pinia)

    customElements.define('juice-editor', defineCustomElement(Root))
}
