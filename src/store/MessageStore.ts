import { defineStore } from 'pinia'
import Config from '../config/config'
import SmartMessage from '../model/SmartMessage'
const config = Config
const isDebug = config.isDebug
const title = "🍋 MessageStore"

export const useMessageStore = defineStore('message-store', {
    state: () => {
        return {
            isDebug: isDebug,
            message: SmartMessage.empty(),
            error: null as Error | null,
        }
    },

    actions: {
        setMessage(message: SmartMessage) {
            this.message = message
        },

        setMessageText(text: string) {
            let verbose = false

            if (verbose) {
                console.log(title, 'setMessageText', text)
            }

            this.message = new SmartMessage(text)
        },

        setError(error: Error | null) {
            if (error == null) {
                return
            } else {
                this.error = error
            }
        },

        clearError() {
            this.error = null
        }
    },
})