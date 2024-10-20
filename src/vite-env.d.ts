/// <reference types="vite/client" />

import { Store } from 'pinia'
import EventManager from './event/EventManager'
import TreeNode from './model/TreeNode'
import EditorData from './model/EditorData'
import { AllApi } from './provider/ApiProvider'

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare global {
    interface Window {
        api: AllApi
        runnerCallback: Function
    }
}

declare module 'turndown';
declare module 'monaco-editor';