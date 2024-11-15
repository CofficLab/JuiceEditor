import { TiptapExtension } from '../model/TiptapGroup';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        LocalStorage: {
            bootLocalStorage: () => ReturnType
            save: () => ReturnType
            enableLocalStorage: () => ReturnType
            disableLocalStorage: () => ReturnType
            enableLocalStorageVerbose: () => ReturnType
            disableLocalStorageVerbose: () => ReturnType
            setContentFromLocalStorage: () => ReturnType
        }
    }
}

export const LocalStorage = TiptapExtension.create({
    name: "localStorage",

    addStorage() {
        return {
            verbose: false,
            printHtml: false,
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

    onUpdate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onUpdate")
        }

        if (this.storage.printHtml) {
            console.log(this.storage.emoji, 'the html is')
            console.log(this.editor.getHTML())
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

            enableLocalStoragePrintHtml: () => () => {
                this.storage.printHtml = true;
                return true;
            },

            disableLocalStoragePrintHtml: () => () => {
                this.storage.printHtml = false;
                return true;
            },

            disableLocalStorageVerbose: () => () => {
                this.storage.verbose = false;
                return true;
            },

            setContentFromLocalStorage: () => ({ commands }) => {
                let saveData = localStorage.getItem(this.storage.localStorageKey)

                if (saveData) {
                    if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                        console.log(this.storage.emoji, '📺 setContentFromLocalStorage')
                    }
                    commands.setContent(saveData)
                }

                return true
            },

            /**
             * call this after 
             * - editor is mounted(means the host element is ready, not onCreate)
             * - slot listener is booted
             */
            bootLocalStorage: () => ({ commands }) => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, '🚩 boot local storage')
                }

                if (this.editor.storage.smartSlot.slotHasOriginalContent == false) {
                    commands.setContentFromLocalStorage()
                } else {
                    if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                        console.log(this.storage.emoji, 'slot has content, skip setContentFromLocalStorage')
                    }
                }

                return true
            }
        }
    }
})