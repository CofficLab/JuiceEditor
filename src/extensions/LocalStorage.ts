import { Extension } from "@tiptap/core"

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        LocalStorage: {
            save: () => ReturnType
            enableLocalStorage: () => ReturnType
            disableLocalStorage: () => ReturnType
            enableLocalStorageVerbose: () => ReturnType
            disableLocalStorageVerbose: () => ReturnType
            loadContentFromLocalStorage: () => ReturnType
        }
    }
}

export const LocalStorage = Extension.create({
    name: "localStorage",

    addStorage() {
        return {
            verbose: true,
            enabled: true,
            emoji: "💾 LocalStorage",
            localStorageKey: 'html',
        }
    },

    onBeforeCreate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onBeforeCreate")
        }
    },

    onCreate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onCreate")
        }
    },

    onUpdate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onUpdate")
        }

        if (!this.storage.enabled) {
            return
        }

        this.editor.commands.save()
    },

    addCommands() {
        return {
            save: () => () => {

                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, 'saveDocument')
                }

                localStorage.setItem(this.storage.localStorageKey, this.editor.getHTML())

                return true
            },

            enableLocalStorage: () => () => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, 'enableLocalStorage')
                }

                this.storage.enabled = true
                return true
            },

            disableLocalStorage: () => () => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, 'disableLocalStorage')
                }

                this.storage.enabled = false
                return true
            },

            enableLocalStorageVerbose: () => () => {
                this.storage.verbose = true;
                return true;
            },

            disableLocalStorageVerbose: () => () => {
                this.storage.verbose = false;
                return true;
            },

            loadContentFromLocalStorage: () => ({ commands }) => {
                let saveData = localStorage.getItem(this.storage.localStorageKey)

                if (saveData) {
                    if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                        console.log(this.storage.emoji, 'setContentFromLocalStorage')
                    }

                    commands.setContent(saveData)
                }

                return true
            }
        }
    }
})