import { TiptapExtension } from '../model/TiptapGroup'

export interface VerboseStorage {
    emoji: string,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        verbose: {
            disableVerboseMode: () => ReturnType
            enableVerboseMode: () => ReturnType
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
            disableVerboseMode: () => ({ chain }) => {
                console.log(this.storage.emoji, '🚫 disableVerboseMode')

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
                    .run()
            },

            enableVerboseMode: () => ({ chain }) => {
                console.log(this.storage.emoji, '✅ enableVerboseMode')

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
                    .run()
            },
        }
    }
})

export default Verbose