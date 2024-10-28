import { TiptapExtension } from '../model/TiptapGroup'

const target = document.querySelector('juice-editor')!
const config = { childList: true, subtree: true, characterData: true }
var observer: MutationObserver | null = null

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartSlot: {
            loadContentFromSlot: () => ReturnType
        }
    }
}

export const SmartSlot = TiptapExtension.create({
    name: "smartSlot",

    addStorage() {
        return {
            verbose: true,
            enabled: false,
            emoji: "👂 SlotListener",
        }
    },

    onCreate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onCreate")
        }

        if (!this.storage.enabled) {
            return
        }

        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "Watch Slot content")
        }

        observer = new MutationObserver(() => this.editor.commands.setContent(target.innerHTML))
        observer.observe(target, config)

        if (this.storage.verbose) {
            console.log(this.storage.emoji, "Set slot content to editor")
        }

        this.editor.commands.setContent(target.innerHTML)

        if (observer == null) {
            throw new Error("observer is null")
        }

        observer.disconnect()

        if (this.storage.verbose) {
            console.log(this.storage.emoji, "Clear slot content")
        }

        target.innerHTML = ''

        observer.observe(target, config)
    },

    addCommands() {
        return {
            loadContentFromSlot: () => ({ editor }) => {
                editor.commands.setContent(target.innerHTML)

                return true
            }
        }
    }
})