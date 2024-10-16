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
            loading: true,
            ready: false,
        }
    },

    actions: {
        setMessage(text: string) {
            this.message = new SmartMessage(title + ": " + text)
        },

        hideLoading() {
            this.loading = false
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

        setNotReady(reason: string) {
            let verbose = false

            if (verbose) {
                console.log(title, `setNotReady, reason(${reason})`)
            }

            this.ready = false
        },

        setReady(reason: string) {
            let verbose = false

            if (verbose) {
                console.log(title, `setReady, reason(${reason})`)
            }

            this.hideLoading()
            this.ready = true
        },
    },
})

export type AppStore = ReturnType<typeof useAppStore>