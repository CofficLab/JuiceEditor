import { TiptapExtension } from '../model/TiptapGroup'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        smartApp: {
            setMounted: () => ReturnType
        }
    }
}

const SmartApp = TiptapExtension.create({
    name: 'smartApp',

    addStorage() {
        return {
            verbose: false,
            mounted: false,
            title: '📱 SmartApp',
        }
    },

    addCommands() {
        return {
            setMounted: () => ({ editor }) => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.title, 'setMounted')
                }

                this.storage.mounted = true
                return true
            },
        }
    },
});

export default SmartApp