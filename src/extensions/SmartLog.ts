import { TiptapExtension } from '../model/TiptapGroup'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        smartLog: {
            disableLog: () => ReturnType
            enableLog: () => ReturnType
        }
    }
}

export const SmartLog = TiptapExtension.create({
    name: "smartLog",

    addStorage() {
        return {
            enabled: false,
        }
    },

    addCommands() {
        return {
            disableLog: () => () => {
                this.storage.enabled = false

                return true
            },

            enableLog: () => () => {
                this.storage.enabled = true

                return true
            },
        }
    }
})
