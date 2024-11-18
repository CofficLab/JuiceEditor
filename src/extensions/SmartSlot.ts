import { Editor } from '@tiptap/core'
import { TiptapExtension } from '../model/TiptapGroup'

const config = { childList: true, subtree: true, characterData: true }
var observer: MutationObserver | null = null

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartSlot: {
            loadContentFromSlot: () => ReturnType
            bootSlotListener: () => ReturnType
            enableSlotListener: () => ReturnType
            enableSlotListenerVerbose: () => ReturnType
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

const SmartSlot = TiptapExtension.create({
    name: "smartSlot",

    priority: 2,

    addStorage() {
        return {
            verbose: false,
            enabled: true,
            slotHasOriginalContent: false,
            emoji: "👂 SlotListener",
        }
    },

    addCommands() {
        return {
            loadContentFromSlot: () => ({ chain }) => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, "load content from slot")
                }

                if (!this.storage.enabled) {
                    console.warn('Slot listener is not enabled')
                    return false
                }

                return chain().setContent(getHostElementContent(this.editor)).run()
            },

            enableSlotListenerVerbose: () => ({ editor }) => {
                this.storage.verbose = true
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

            /**
             * run this after editor is mounted, because we need to get the host element
             */
            bootSlotListener: () => ({ editor, commands }) => {
                if (!this.storage.enabled) {
                    console.warn('Slot listener is not enabled')
                    return false
                }

                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, '🖥️ boot slot listener')
                }

                let slotContent = getHostElementContent(this.editor).trim()

                if (slotContent.length > 0) {
                    this.storage.slotHasOriginalContent = true
                    commands.loadContentFromSlot()
                }

                let hostElement = getHostElement(editor)

                if (!hostElement) {
                    throw new Error("Host element is not initialized")
                }

                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, "🖥️ watch slot content")
                }

                observer = new MutationObserver(() => editor.commands.loadContentFromSlot())
                observer.observe(hostElement, config)

                if (observer == null) {
                    throw new Error("observer is null")
                }

                observer.disconnect()

                if (this.storage.verbose) {
                    console.log(this.storage.emoji, "clear slot content")
                }

                hostElement.innerHTML = ''
                observer.observe(hostElement, config)

                return true
            },
        }
    }
})

export default SmartSlot