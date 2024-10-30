import { TiptapExtension } from '../model/TiptapGroup'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        smartApp: {
            setMounted: () => ReturnType
        }
    }
}

export const SmartApp = TiptapExtension.create({
    name: 'smartApp',

    addStorage() {
        return {
            verbose: true,
            mounted: false,
            title: '📱 SmartApp',
        }
    },

    addCommands() {
        return {
            setMounted: () => ({ editor }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.title, 'setMounted')
                }

                this.storage.mounted = true
                return true
            },
        }
    },
});
