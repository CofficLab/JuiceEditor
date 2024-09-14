import { defineStore } from "pinia";
import PageMode from "../model/PageMode";

const title = "💻 ModeStore"

export const useModeStore = defineStore('mode-store', {
    state: () => {
        return {
            mode: PageMode.BASIC
        }
    },

    actions: {
        setMode(mode: string, reason: string) {
            let verbose = false

            if (verbose) {
                console.log(`${title}.setMode(${reason})`, mode)
            }

            this.mode = new PageMode(mode)
        },

        isBasic() {
            return this.mode.isBasic()
        },

        isSlot() {
            return this.mode.isSlot()
        },
    }
})

export type ModeStore = ReturnType<typeof useModeStore>