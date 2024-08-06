/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare interface Window {
    api: Object
    runner: Function
    runnerCallback: Function
}

interface Window {
    setCode: (code: string) => void; // 根据实际参数类型调整
}


declare module 'turndown';