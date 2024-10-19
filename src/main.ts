import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defineCustomElement } from 'vue'
// Change the import statement to use a type assertion
import Root from './pages/Root.ce.vue' assert { type: 'ce-vue' }

export function defineJuiceEditor() {
    let pinia = createPinia()
    let app = createApp(Root)

    app.use(pinia)

    customElements.define('juice-editor', defineCustomElement(Root))
}

