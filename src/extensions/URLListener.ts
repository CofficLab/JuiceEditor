import { TiptapEditor, TiptapExtension } from '../model/TiptapGroup'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        URLListener: {
            onURLChanged: () => ReturnType
            goto: (id: string, offset: number) => ReturnType
        }
    }
}

const URLListener = TiptapExtension.create({
    name: "urlListener",

    addStorage() {
        return {
            verbose: false,
            enabled: true,
            emoji: "👂 URLListener",
            editorLabel: "juice-editor",
        }
    },

    onCreate() {
        if (!this.storage.enabled) {
            return
        }

        window.onpopstate = () => {
            this.editor.commands.onURLChanged()
        }
    },

    onDestroy() {
        window.onpopstate = null
    },

    addCommands() {
        return {
            onURLChanged: () => ({ chain }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'URL变化了', window.location.hash)
                }
                let hash = window.location.hash
                if (hash) {
                    this.editor.commands.goto(hash.substring(1), 120)
                }
                return true
            },

            goto: (id: string, offset: number = 120) => ({ chain }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'goto', id)
                }

                // 获取目标 div
                const editorElement = this.editor.options.element
                const targetDiv = editorElement?.querySelector(`#${id}`)

                // 如果找到目标 div，则滚动到该 div
                if (targetDiv) {
                    const elementPosition = targetDiv.getBoundingClientRect().top + window.scrollY // 目标元素的绝对位置
                    const offsetPosition = elementPosition - offset // 减去偏移量

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    })
                } else {
                    console.log('Target div not found in Shadow DOM')
                }

                return true
            }
        }
    }
})

export default URLListener