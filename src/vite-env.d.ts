/// <reference types="vite/client" />

import { Store } from 'pinia'
import EventManager from './event/EventManager'

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare interface Window {
    api: object
    runner: Function
    runnerCallback: Function
    setCode: (code: string) => void
}

declare global {
    interface Window {
        api?: {
            app?: any;
            event?: EventManager;
            feature?: any;
        };
        setCode: (code: string) => void
        setLanguage: (lan: string) => void
    }
}

declare module 'turndown';