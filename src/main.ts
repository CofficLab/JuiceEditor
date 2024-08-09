import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defineCustomElement } from 'vue'
import App from './App.ce.vue'

let pinia = createPinia()
let app = createApp(App)

app.use(pinia)

customElements.define('juice-editor', defineCustomElement(App))