import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defineCustomElement } from 'vue'
import VueDarkModeSwitch from './components/DarkElement.ce.vue'
import App from './App.ce.vue'

let pinia = createPinia()
let app = createApp(App)

app.use(pinia)

customElements.define('dark-element', defineCustomElement(VueDarkModeSwitch))
customElements.define('juice-editor', defineCustomElement(App))