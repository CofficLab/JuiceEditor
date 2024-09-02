import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defineCustomElement } from 'vue'
import App from './App.ce.vue'
import Config from './config/config'

let pinia = createPinia()
let app = createApp(App)

app.use(pinia)

customElements.define(Config.editorLabel, defineCustomElement(App))