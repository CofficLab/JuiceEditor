import './app.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

let pinia = createPinia()
let app = createApp(App)

app.use(pinia)
app.mount('#app')
