import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defineCustomElement } from 'vue'
import Root from './pages/Root.ce.vue'

let pinia = createPinia()
let app = createApp(Root)

app.use(pinia)

customElements.define('juice-editor', defineCustomElement(Root))

if (process.env.NODE_ENV === 'development') {
    import('./dev').then(module => {
        if (typeof module.default === 'function') {
            module.default()
        } else {
            console.error('dev 模块没有默认导出函数')
        }
    }).catch(error => {
        console.error('加载 dev 模块时出错:', error)
    })
}
