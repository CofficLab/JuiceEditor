import { defineStore } from 'pinia'
import Config from '../config/config'
import { v4 as uuidv4 } from 'uuid'

const config = Config
const isDebug = config.isDebug
const title = "🍋 MessageStore"

export const useMessageStore = defineStore('message-store', {
    state: () => {
        return {
            isDebug: isDebug,
            message: '',
            uuid: '',
        }
    },

    actions: {
        setMessage(message: string) {
            this.message = message
            this.uuid = uuidv4()
        }
    },
})