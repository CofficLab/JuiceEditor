import { TiptapExtension } from '../model/TiptapGroup'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        smartLog: {
            disableLog: () => ReturnType
            enableLog: () => ReturnType
        }
    }
}

const SmartLog = TiptapExtension.create({
    name: "smartLog",

    addStorage() {
        return {
            enabled: false,
            emoji: '🔍 SmartLog',
        }
    },

    addCommands() {
        return {
            disableLog: () => () => {
                this.storage.enabled = false

                return true
            },

            enableLog: () => () => {
                console.log(this.storage.emoji, '📜 enableLog')

                this.storage.enabled = true

                return true
            },
        }
    }
})

export default SmartLog