import { defineStore } from 'pinia'
import Config from '../config/config'
import SmartMessage from '../model/SmartMessage'

const config = Config
const isDebug = config.isDebug
const title = "🍋 AppStore"

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            isDebug: isDebug,
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

        setNotReady(reason: string) {
            let verbose = true

            if (verbose) {
                console.log(title, 'setNotReady, reason:', reason)
            }

            this.ready = false
        },

        setReady(reason: string) {
            let verbose = true

            if (verbose) {
                console.log(title, 'setReady, reason:', reason)
            }

            this.hideLoading()
            this.ready = true
        },
    },
})

export type AppStore = ReturnType<typeof useAppStore>