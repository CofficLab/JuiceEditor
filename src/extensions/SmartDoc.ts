import { Document } from '@tiptap/extension-document'
import Article from './Article'

export interface SmartDocStorage {
    verbose: boolean,
    emoji: string,
    booted: boolean,
    loading: boolean,
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
            boot: () => ReturnType
            setDocVerbose: (value: boolean) => ReturnType
            setReadOnly: (value: boolean) => ReturnType
            toggleReadOnly: () => ReturnType
            setLoading: (value: boolean) => ReturnType
            updateContent: (content: string) => ReturnType
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
            booted: false,
            loading: true,
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

            boot: () => ({ chain, commands }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, '🚀 boot')
                    commands.appendLog(this.storage.emoji + '-> 🚀 boot')
                }

                chain()
                    .bootSlotListener()
                    .bootLocalStorage()
                    .bootWebKit()
                    .bootNodeStore()
                    .bootToc()
                    .bootDebugBar()
                    .setLoading(false)
                    .run()

                this.storage.booted = true

                return true
            },

            setLoading: (value: boolean) => ({ commands }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, '🔄 setLoading', value)
                    commands.appendLog(this.storage.emoji + '-> 🔄 setLoading ' + value)
                }

                this.storage.loading = value
                if (this.storage.loading) {
                    commands.blur()
                } else {
                    commands.focus()
                }

                return true
            },

            updateContent: (content: string) => ({ commands }) => {
                commands.setContent(content, true)
                return true
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