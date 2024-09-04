import { defineStore } from 'pinia'
import Config from '../config/config'
import { v4 as uuidv4 } from 'uuid'
import SmartMessage from '../model/SmartMessage'
import UUIDHelper from '../helper/UUIDHelper'
const config = Config
const isDebug = config.isDebug
const title = "🍋 MessageStore"

export const useMessageStore = defineStore('message-store', {
    state: () => {
        return {
            isDebug: isDebug,
            message: SmartMessage.empty(),
            uuid: '',
        }
    },

    actions: {
        setMessageText(text: string) {
            let verbose = false

            if (verbose) {
                console.log(title, 'setMessageText', text)
            }

            this.message = new SmartMessage(text)
            this.uuid = UUIDHelper.generate()
        }
    },
})