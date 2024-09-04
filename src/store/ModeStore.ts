import { defineStore } from "pinia";
import PageMode from "../model/PageMode";
export const useModeStore = defineStore('mode-store', {
    state: () => {
        return {
            mode: PageMode.BASIC
        }
    },

    actions: {
        setMode(mode: string) {
            this.mode = new PageMode(mode)
        },

        isBasic() {
            return this.mode.isBasic()
        },

        isNode() {
            return this.mode.isNode()
        },

        isSlot() {
            return this.mode.isSlot()
        },
    }
})

export type ModeStore = ReturnType<typeof useModeStore>