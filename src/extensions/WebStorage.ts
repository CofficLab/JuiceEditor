import EditorNode from '../model/EditorNode';
import { TiptapExtension } from '../model/TiptapGroup'
import axios from 'axios';

export interface WebStorageStorage {
    verbose: boolean,
    emoji: string,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        WebStorage: {
            setContentFromWeb: (url: string, uuid: string) => ReturnType
        }
    }
}

const WebStorage = TiptapExtension.create<{}, WebStorageStorage>({
    name: "webStorage",

    addStorage() {
        return {
            verbose: true,
            emoji: "🌍 WebStorage",
        }
    },

    addCommands() {
        return {
            setContentFromWeb: (url: string) => ({ editor, commands, chain }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'loadContentFromWeb', url)
                    commands.webKitSendDebugMessage(`loadContentFromWeb -> ${url}`)
                }

                axios.get(`${url}`)
                    .then(response => {
                        let content = response.data

                        editor.commands
                            .setContent(content, true)
                    })
                    .catch(error => {
                        if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
                            this.editor.commands.showAlert('通过网络获取内容失败，可能是跨域限制', {
                                url,
                                error: error.message
                            })
                        } else {
                            this.editor.commands.showAlert('加载内容失败', {
                                url,
                                error: error.message,
                                reporter: this.storage.emoji,
                                stage: 'setContentFromWeb'
                            })
                        }
                    })

                return true
            }
        }
    }
})

export default WebStorage