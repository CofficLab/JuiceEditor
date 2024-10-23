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
            errorEvent: null as CustomEvent | null,
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

        setErrorEvent(event: CustomEvent) {
            this.errorEvent = event
        },

        clearError() {
            this.error = null
        }
    },
})