/// <reference types="vite/client" />

import { Store } from 'pinia'
import EventManager from './event/EventManager'
import TreeNode from './model/TreeNode'
import EditorDoc from './model/EditorDoc'

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
        api: {
            app: any;
            event: EventManager;
            feature?: any;

            setUUIDAndContent: (uuid: string, content: string) => void

            setTreeNode: (node: TreeNode) => void

            setTreeNodeAndDocs: (node: TreeNode, docs: EditorDoc[]) => void

            setTreeNodeInBase64: (treeNodeInBase64: string) => void

            setDoc: (doc: EditorDoc) => void
        };
        setCode: (code: string) => void
        setLanguage: (lan: string) => void
        runnerCallback: (result: string) => void
    }
}

declare module 'turndown';
declare module 'monaco-editor';