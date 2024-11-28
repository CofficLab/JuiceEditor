import { TiptapExtension } from '../model/TiptapGroup'

export interface VerboseStorage {
    emoji: string,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        verbose: {
            disableAllVerbose: () => ReturnType
            enableAllVerbose: () => ReturnType
        }
    }
}

const Verbose = TiptapExtension.create<{}, VerboseStorage>({
    name: "verbose",

    addStorage() {
        return {
            emoji: '🔍 Verbose',
        }
    },

    addCommands() {
        return {
            disableAllVerbose: () => ({ chain }) => {
                console.log(this.storage.emoji, '🚫 disableAllVerbose')

                return chain()
                    .disableDocVerbose()
                    .disableLocalStorageVerbose()
                    .disableWebKitVerbose()
                    .disableAssistantVerbose()
                    .disableImageVerbose()
                    .disableParagraphVerbose()
                    .disableBackgroundVerbose()
                    .disableCodeBlockVerbose()
                    .disableArticleVerbose()
                    .disableURLListenerVerbose()
                    .disableNodeStoreVerbose()
                    .disableTocVerbose()
                    .disableSmartSelectionVerbose()
                    .disableSmartUUIDVerbose()
                    .disableHeadingStoreVerbose()
                    .disableDebugBarVerbose()
                    .run()
            },

            enableAllVerbose: () => ({ chain }) => {
                this.editor.commands.appendLog(this.storage.emoji, '✅ enableAllVerbose')

                return chain()
                    .enableDocVerbose()
                    .enableLocalStorageVerbose()
                    .enableWebKitVerbose()
                    .enableImageVerbose()
                    .enableAssistantVerbose()
                    .enableParagraphVerbose()
                    .enableBackgroundVerbose()
                    .enableCodeBlockVerbose()
                    .enableArticleVerbose()
                    .enableURLListenerVerbose()
                    .enableNodeStoreVerbose()
                    .enableTocVerbose()
                    .enableSmartSelectionVerbose()
                    .enableSmartUUIDVerbose()
                    .enableHeadingStoreVerbose()
                    .enableDebugBarVerbose()
                    .run()
            },
        }
    }
})

export default Verbose