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
            enabled: false,
            emoji: "💾 LocalStorage",
            localStorageKey: 'html',
        }
    },

    onCreate() {
        console.log(this.storage.emoji, "onCreate")


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

        this.editor.commands.save()
    },

    addCommands() {
        return {
            save: () => () => {

                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'saveDoc')
                }

                // localStorage.setItem('doc', doc.toJSONString())

                return true
            }
        }
    }
})