import { defineStore } from 'pinia'
import SmartMessage from '../model/SmartMessage'

const isDebug = process.env.NODE_ENV === 'development'
const title = "🍋 AppStore"

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            isDebug: isDebug,
            error: null as Error | null,
            message: new SmartMessage(""),
            loadingReason: "初始化",
            ready: false,
        }
    },

    actions: {
        setMessage(text: string) {
            this.message = new SmartMessage(title + ": " + text)
        },

        closeDraw: function () {
            let verbose = false;
            if (verbose) {
                console.log(title, 'close draw')
            }
            document.dispatchEvent(new CustomEvent('close-draw'))
        },

        setError(error: Error) {
            this.error = error
        },

        setLoading(reason: string) {
            let verbose = false

            if (verbose) {
                console.log(title, `setLoading, reason(${reason})`)
            }

            this.loadingReason = reason
            this.ready = false
        },

        setReady(reason: string) {
            let verbose = true

            if (verbose) {
                console.log(title, `setReady, reason(${reason})`)
            }

            this.loadingReason = ""

            if (this.ready) {
                console.log(title, `setReady, reason(${reason}) no change`)
                return
            }

            this.ready = true
        },
    },
})

export type AppStore = ReturnType<typeof useAppStore>