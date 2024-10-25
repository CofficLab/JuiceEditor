import { Extension } from "@tiptap/core"
import axios from 'axios';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        WebStorage: {
            loadContentFromWeb: (url: string) => ReturnType
        }
    }
}

export const WebStorage = Extension.create({
    name: "webStorage",

    addStorage() {
        return {
            verbose: true,
            emoji: "🌍 WebStorage",
        }
    },

    onCreate() {
        if (this.storage.verbose) {
            console.log(this.storage.emoji, "onCreate")
        }
    },

    onUpdate() {
        if (this.storage.verbose) {
            console.log(this.storage.emoji, "onUpdate")
        }
    },

    addCommands() {
        return {
            loadContentFromWeb: (url: string) => ({ editor }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'loadContentFromWeb', url)
                }

                new Promise((resolve, reject) => {
                    axios.get(`${url}`)
                        .then(response => {
                            editor.commands.setContent(response.data)
                            resolve(true)
                        })
                        .catch(error => {
                            console.error('Error loading content:', error)
                            reject(error)

                            this.editor.commands.showAlert('加载内容失败', {
                                error: error.message
                            })
                        })
                })

                return true
            }
        }
    }
})
