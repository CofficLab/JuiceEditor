import { Extension } from "@tiptap/core"

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        smartReady: {
            setReady: () => ReturnType
            setUnready: () => ReturnType
        }
    }
}

export const SmartReady = Extension.create({
    name: "smartReady",

    addStorage() {
        return {
            ready: false,
        }
    },

    onCreate() {
        this.storage.ready = true
    },

    addCommands() {
        return {
            setReady: () => () => {
                this.storage.ready = true

                return true
            },

            setUnready: () => () => {
                this.storage.ready = false

                return true
            },
        }
    }
})
