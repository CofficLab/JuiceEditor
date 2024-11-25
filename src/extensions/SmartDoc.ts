import { Document } from '@tiptap/extension-document'
import EditorNode from '../model/EditorNode'
import Article from './Article'

export interface SmartDocStorage {
    verbose: boolean,
    emoji: string,
    mounted: boolean,
}

export interface SmartDocOptions {
    content: string,
    priority: number,
}

declare module '@tiptap/vue-3' {
    interface Commands<ReturnType> {
        smartDoc: {
            enableDocVerbose: () => ReturnType
            disableDocVerbose: () => ReturnType
            setMounted: () => ReturnType
            setDocVerbose: (value: boolean) => ReturnType
            setReadOnly: (value: boolean) => ReturnType
            toggleReadOnly: () => ReturnType
        }
    }
}

const SmartDoc = Document.extend<SmartDocOptions, SmartDocStorage>({
    content: `${Article.name}`,

    priority: 1000,

    addStorage() {
        return {
            verbose: false,
            emoji: "🌳 Doc",
            mounted: false,
        }
    },

    addCommands() {
        return {
            enableDocVerbose: () => () => {
                this.storage.verbose = true
                return true
            },

            disableDocVerbose: () => () => {
                this.storage.verbose = false
                return true
            },

            setMounted: () => ({ chain }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, '🖥️ setMounted')
                }

                this.storage.mounted = true

                return chain()
                    .bootSlotListener()
                    .bootLocalStorage()
                    .bootWebKit()
                    .run()
            },

            setDocVerbose: (value: boolean) => () => {
                this.storage.verbose = value
                return true
            },

            setReadOnly: (value: boolean) => () => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, '🔒 setReadOnly', value)
                }

                if (value) {
                    this.editor.commands.setEditorBackground('default')
                } else {
                    this.editor.commands.setEditorBackground('gray')
                }

                this.editor.setEditable(value, true)
                return true
            },

            toggleReadOnly: () => () => {
                this.editor.commands.setReadOnly(!this.editor.isEditable)

                return true
            },
        }
    }
})

export default SmartDoc