/// <reference types="vite/client" />

import TreeNode from './model/TreeNode'
import EditorData from './model/EditorData'

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'turndown';
declare module 'monaco-editor';