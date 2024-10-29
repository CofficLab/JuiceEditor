import { Editor } from '@tiptap/core'
import { TiptapExtension } from '../model/TiptapGroup'

const config = { childList: true, subtree: true, characterData: true }
var observer: MutationObserver | null = null

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartSlot: {
            loadContentFromSlot: () => ReturnType
            startSlotListenerOnMount: () => ReturnType
            enableSlotListener: () => ReturnType
            disableSlotListener: () => ReturnType
        }
    }
}

function getHostElement(editor: Editor): Element | null {

    let target = editor.options.element
    let root = target.getRootNode()

    if (root instanceof ShadowRoot == false) {
        console.error('root is not a ShadowRoot')
        return null
    }

    return (root as ShadowRoot).host
}

function getHostElementContent(editor: Editor): string {
    return getHostElement(editor)?.innerHTML ?? ''
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
    addCommands() {
        return {
            loadContentFromSlot: () => ({ editor, commands }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, "loadContentFromSlot")
                }

                if (!this.storage.enabled) {
                    console.warn('Slot listener is not enabled')
                    return false
                }

                commands.setContent(getHostElementContent(editor))

                return true
            },

            enableSlotListener: () => ({ editor }) => {
                this.storage.enabled = true
                return true
            },

            disableSlotListener: () => ({ editor }) => {
                this.storage.enabled = false
                return true
            },

            startSlotListenerOnMount: () => ({ editor, commands }) => {
                if (!this.storage.enabled) {
                    console.warn('Slot listener is not enabled')
                    return false
                }

                commands.loadContentFromSlot()

                console.log(this.storage.emoji, 'startSlotListenerOnMount')

                let hostElement = getHostElement(editor)

                if (!hostElement) {
                    throw new Error("Host element is not initialized")
                }

                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, "Watch Slot content")
                }

                observer = new MutationObserver(() => editor.commands.loadContentFromSlot())
                observer.observe(hostElement, config)

                if (observer == null) {
                    throw new Error("observer is null")
                }

                observer.disconnect()

                if (this.storage.verbose) {
                    console.log(this.storage.emoji, "Clear slot content")
                }

                hostElement.innerHTML = ''
                observer.observe(hostElement, config)

                return true
            },
        }
    }
})