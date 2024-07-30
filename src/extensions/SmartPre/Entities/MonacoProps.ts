import { SmartLanguage } from "./SmartLanguage"

export const MonacoProps = {
    content: {
        type: String,
        default: ''
    },
    // 如果为0，则自动判断；如果大于0，则固定高度
    height: {
        type: Number,
        default: 0
    },
    editable: {
        type: Boolean,
        default: true
    },
    // 用户配置的运行按钮是否可见
    runVisible: {
        type: Boolean,
        default: false
    },
    language: {
        type: SmartLanguage,
        default: SmartLanguage.fromString('unknown')
    },
    readOnly: {
        type: Boolean,
        default: false
    },
    showRunButton: {
        type: Boolean,
        default: false
    },
    onContentChanged: {
        type: Function,
        default: (content: string) => {
            console.log('MonacoBox: monaco content changed', content)
        }
    },
    onRunnableChanged: {
        type: Function,
        default: () => {
            console.log('monaco runnable changed')
        }
    },
    onLanguageChanged: {
        type: Function,
        default: (language: SmartLanguage) => {
            console.log('🍋 💼 MonacoBox: monaco language changed', language)
        }
    },
    showLineNumbers: {
        type: Boolean,
        default: true
    },
    runner: {
        type: Function,
        default: () => {
            console.log('monaco runner')
        }
    },
    uuid: {
        type: String,
        default: ''
    }
}