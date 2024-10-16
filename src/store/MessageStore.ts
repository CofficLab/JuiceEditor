import { defineStore } from 'pinia'
import SmartMessage from '../model/SmartMessage'
const isDebug = process.env.NODE_ENV === 'development'
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

        setDebug(text: string) {
            this.message = new SmartMessage(text, "debug")
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