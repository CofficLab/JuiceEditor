import { TiptapExtension } from '../model/TiptapGroup'
import axios from 'axios';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        WebStorage: {
            setContentFromWeb: (url: string) => ReturnType
        }
    }
}

export const WebStorage = TiptapExtension.create({
    name: "webStorage",

    addStorage() {
        return {
            verbose: true,
            emoji: "🌍 WebStorage",
        }
    },

    onCreate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onCreate")
        }
    },

    onUpdate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onUpdate")
        }
    },

    addCommands() {
        return {
            setContentFromWeb: (url: string) => ({ editor, commands }) => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, 'loadContentFromWeb', url)
                }

                commands.webKitSendDebugMessage(`loadContentFromWeb -> ${url}`)

                axios.get(`${url}`)
                    .then(response => {
                        let content = response.data

                        if (content.length == 0) {
                            this.editor.commands.showAlert('加载内容失败', {
                                error: '内容为空'
                            })
                        } else {
                            editor.commands.setContent(content)
                        }
                    })
                    .catch(error => {
                        console.error('Error loading content:', error)

                        this.editor.commands.showAlert('加载内容失败', {
                            error: error.message
                        })
                    })

                return true
            }
        }
    }
})
