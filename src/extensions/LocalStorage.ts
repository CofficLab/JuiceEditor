import { Extension } from "@tiptap/core"

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        LocalStorage: {
            save: () => ReturnType
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

    onCreate() {
        console.log(this.storage.emoji, "onCreate")

        if (!this.storage.enabled) {
            return
        }

        let saveData = localStorage.getItem(this.storage.localStorageKey)

        if (saveData) {
            if (this.storage.verbose) {
                console.log(this.storage.emoji, 'setContent')
            }

            this.editor.commands.setContent(saveData)
        }
    },

    onUpdate() {
        console.log(this.storage.emoji, "onUpdate")



        if (!this.storage.enabled) {
            return
        }

        this.editor.commands.save()
    },

    addCommands() {
        return {
            save: () => () => {

                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'saveDocument')
                }

                localStorage.setItem(this.storage.localStorageKey, this.editor.getHTML())

                return true
            }
        }
    }
})