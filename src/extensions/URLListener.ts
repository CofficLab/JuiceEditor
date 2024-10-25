import { Extension } from "@tiptap/core"
import DomHelper from "../helper/DomHelper"

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        URLListener: {
            onURLChanged: () => ReturnType
        }
    }
}

export const URLListener = Extension.create({
    name: "urlListener",

    addStorage() {
        return {
            verbose: true,
            enabled: true,
            emoji: "👂 URLListener",
            editorLabel: "juice-editor",
        }
    },

    onCreate() {
        console.log(this.storage.emoji, "onCreate")

        if (!this.storage.enabled) {
            return
        }

        window.onpopstate = this.editor.commands.onURLChanged
    },

    addCommands() {
        return {
            onURLChanged: () => () => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'URL变化了', window.location.hash)
                }
                let hash = window.location.hash
                if (hash) {
                    DomHelper.goto(hash.substring(1), this.storage.editorLabel)
                }

                return true
            }
        }
    }
})