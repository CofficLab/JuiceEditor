import { defineStore } from 'pinia'
import SmartMessage from '../model/SmartMessage'

const title = "🍋 RequestStore"

export const useRequestStore = defineStore('request-store', {
    state: () => {
        return {
            baseUrl: 'http://127.0.0.1:8080',
            message: new SmartMessage(""),
        }
    },

    actions: {
        setMessage(text: string) {
            this.message = new SmartMessage(title + ": " + text)
        },

        setBaseUrl(baseUrl: string) {
            let verbose = true

            if (this.baseUrl === baseUrl) {
                console.log(`${title}.setBaseUrl(${baseUrl}) no change`)
                return
            }

            if (verbose) {
                console.log(`${title}.setBaseUrl(${baseUrl})`)
            }

            this.baseUrl = baseUrl
        },

        getBaseUrl(): string {
            return this.baseUrl
        },
    },
})

export type RequestStore = ReturnType<typeof useRequestStore>