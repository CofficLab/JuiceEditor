declare global {
    interface Window {
        editor: Editor;
    }
}

import { EditorFactory, Editor } from './main'

const title = "⛰️ Dev"
const chatApi = '/proxy/api/chat'

EditorFactory.register('my-editor', {
    onBeforeCreate: () => {
        console.log(title, '🏭 onBeforeCreate for label my-editor')
    },
    onCreate: (editor: Editor) => {
        console.log(title, '🚩 onCreate for label my-editor')

        // Enable Verbose
        editor.enableDocVerbose()
        // editor.enableDebugBarVerbose()

        // Enable Features
        editor.enableDebugBar()
        editor.enableLocalStorage()

        // Disable Features
        editor.disableWebKit()

        // Set Options
        editor.setChatApi(chatApi)
        editor.setDrawLink('/draw/index.html?')
        editor.setMenuBackgroundColor('orange')

        window.editor = editor
    },
    onBooted: (editor: Editor) => {
        console.log(title, '🖥️ onBooted for label my-editor')
    }
})
