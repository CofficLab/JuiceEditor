import { TiptapExtension } from '../model/TiptapGroup';
import { NodeStoreStorage } from './NodeStore';
import { SmartSlotStorage } from './SmartSlot';

export interface LocalStorageStorage {
    verbose: boolean,
    printDocNode: boolean,
    enabled: boolean,
    emoji: string,
    localStorageKey: string,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        LocalStorage: {
            bootLocalStorage: () => ReturnType
            saveLocalStorage: () => ReturnType
            enableLocalStorage: () => ReturnType
            disableLocalStorage: () => ReturnType
            enableLocalStorageVerbose: () => ReturnType
            enableLocalStoragePrintDocNode: () => ReturnType
            disableLocalStorageVerbose: () => ReturnType
            setContentFromLocalStorage: () => ReturnType
            setLocalStorageVerbose: (value: boolean) => ReturnType
        }
    }
}

const LocalStorage = TiptapExtension.create<{}, LocalStorageStorage>({
    name: "localStorage",

    priority: 1,

    addStorage() {
        return {
            verbose: false,
            printDocNode: false,
            enabled: true,
            emoji: "💾 LocalStorage",
            localStorageKey: 'html',
        }
    },

    onBeforeCreate() {
        if (this.storage.verbose) {
            console.log(this.storage.emoji, "onBeforeCreate")
        }
    },

    onUpdate() {
        if (this.storage.printDocNode) {
            console.log(this.storage.emoji, 'the doc node is')
            const nodeStore = this.editor.storage.nodeStore as NodeStoreStorage
            console.log(nodeStore.article)
        }

        if (!this.storage.enabled) {
            return
        }

        this.editor.commands.saveLocalStorage()
    },

    addCommands() {
        return {
            saveLocalStorage: () => () => {
                if (this.storage.verbose) {
                    this.editor.commands.appendLog(this.storage.emoji, '🔄 saveDoc')
                }

                localStorage.setItem(this.storage.localStorageKey, this.editor.getHTML())

                return true
            },

            enableLocalStorage: () => () => {
                if (this.storage.verbose) {
                    this.editor.commands.appendLog(this.storage.emoji, '✅ enableLocalStorage')
                }

                this.storage.enabled = true
                return true
            },

            disableLocalStorage: () => () => {
                if (this.storage.verbose) {
                    this.editor.commands.appendLog(this.storage.emoji, '🔄 disableLocalStorage')
                }

                this.storage.enabled = false
                return true
            },

            enableLocalStorageVerbose: () => () => {
                this.storage.verbose = true;
                return true;
            },

            enableLocalStoragePrintDocNode: () => () => {
                this.storage.printDocNode = true;
                return true;
            },

            disableLocalStoragePrintDocNode: () => () => {
                this.storage.printDocNode = false;
                return true;
            },

            disableLocalStorageVerbose: () => () => {
                this.storage.verbose = false;
                return true;
            },

            setContentFromLocalStorage: () => ({ commands }) => {
                let saveData = localStorage.getItem(this.storage.localStorageKey)

                if (saveData) {
                    if (this.storage.verbose) {
                        this.editor.commands.appendLog(this.storage.emoji, '📺 setContentFromLocalStorage')
                    }

                    commands.setContent(saveData, true)
                }

                return true
            },

            setLocalStorageVerbose: (value: boolean) => () => {
                this.storage.verbose = value
                return true
            },

            /**
             * call this after 
             * - editor is mounted(means the host element is ready, not onCreate)
             */
            bootLocalStorage: () => ({ commands }) => {
                if (!this.storage.enabled) {
                    return true
                }

                if (this.storage.verbose) {
                    this.editor.commands.appendLog(this.storage.emoji, '🚀 bootLocalStorage ' + this.storage.enabled)
                }

                const smartSlot = this.editor.storage.smartSlot as SmartSlotStorage

                if (smartSlot.slotHasOriginalContent == false) {
                    commands.setContentFromLocalStorage()
                } else {
                    if (this.storage.verbose) {
                        this.editor.commands.appendLog(this.storage.emoji, '🔄 slot has content, skip setContentFromLocalStorage')
                    }
                }

                return true
            }
        }
    }
})

export default LocalStorage