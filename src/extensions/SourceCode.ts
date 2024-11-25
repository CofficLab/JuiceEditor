import { TiptapExtension } from '../model/TiptapGroup'

export interface SourceCodeStorage {
    verbose: boolean,
    emoji: string,
    shouldShow: boolean,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        sourceCode: {
            showSourceCode: () => ReturnType
            hideSourceCode: () => ReturnType
            toggleSourceCode: () => ReturnType
        }
    }
}

const SourceCode = TiptapExtension.create<{}, SourceCodeStorage>({
    name: "sourceCode",

    addStorage() {
        return {
            verbose: true,
            emoji: "💻 SourceCode",
            shouldShow: false,
        }
    },

    addCommands() {
        return {
            showSourceCode: () => () => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'showSourceCode')
                }

                this.storage.shouldShow = true

                return true
            },

            hideSourceCode: () => () => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'hideSourceCode')
                }

                this.storage.shouldShow = false

                return true
            },

            toggleSourceCode: () => () => {
                this.storage.shouldShow = !this.storage.shouldShow

                return true
            }
        }
    }
})

export default SourceCode