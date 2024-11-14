import { Extension } from "@tiptap/core";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        Assistant: {
            setChatApi: (api: string) => ReturnType
        }
    }
}

const Assistant = Extension.create({
    name: 'assistant',

    addStorage() {
        return {
            verbose: true,
            chatApi: null,
            title: '🦜 Assistant',
        }
    },

    addCommands() {
        return {
            setChatApi: (api: string) => ({ commands }) => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.title, '⚙️ set chat api', api);
                }

                this.storage.chatApi = api;

                return true;
            },
        };
    },
});

export default Assistant;

