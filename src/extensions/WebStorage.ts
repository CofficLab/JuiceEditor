import { Extension } from "@tiptap/core"

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        WebStorage: {
            loadFromWebStorage: () => ReturnType
        }
    }
}

export const WebStorage = Extension.create({
    name: "webStorage",

    addStorage() {
        return {
            verbose: true,
            enabled: false,
            baseUrl: 'https://storage.coffic.com',
            emoji: "🌍 WebStorage",
            localStorageKey: 'html',
        }
    },

    onCreate() {
        console.log(this.storage.emoji, "onCreate")
    },

    onUpdate() {
        console.log(this.storage.emoji, "onUpdate")
    },

    addCommands() {
        return {
            loadFromWebStorage: () => () => {

                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'loadFromWebStorage')
                }

                return true
            }
        }
    }
})