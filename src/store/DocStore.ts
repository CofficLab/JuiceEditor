import { defineStore } from 'pinia'
import EditorDoc from '../model/EditorDoc'
import Config from '../config/config'
import MarkdownHelper from '../helper/MarkdownHelper'
import SmartMessage from '../model/SmartMessage'
const config = Config
const isDebug = config.isDebug
const title = "🍋 DocStore"

export const useDocStore = defineStore('doc-store', {
    state: () => {
        return {
            message: new SmartMessage(""),
            error: null as Error | null,
            doc: null as EditorDoc | null,
            drawLink: config.drawLink,
            monacoLink: config.monacoLink,
            selectionType: '',
        }
    },

    actions: {
        setMessage(text: string) {
            this.message = new SmartMessage(title + ": " + text)
        },

        setError(error: Error) {
            this.error = error
        },

        closeDraw: function () {
            let verbose = false;
            if (verbose) {
                console.log(title, 'close draw')
            }
            document.dispatchEvent(new CustomEvent('close-draw'))
        },

        getHTML(): string | undefined {
            return this.getDoc()?.html
        },

        getDrawLink(): string {
            return this.drawLink
        },

        getMarkdown(): string | undefined {
            const html = this.getHTML()
            return html ? MarkdownHelper.html2markdown(html) : undefined
        },

        setDrawLink: function (link: string) {
            this.drawLink = link
        },

        updateSelectionType(type: string) {
            if (type == this.selectionType) return

            this.selectionType = type
        },

        getDoc(): EditorDoc | null {
            return this.doc
        },

        getUUID(): string | undefined {
            return this.getDoc()?.getUUID()
        },

        setDoc(doc: EditorDoc) {
            let verbose = true;

            if (verbose) {
                console.log(title, 'setDoc', doc)

                this.setMessage("SetDoc: " + JSON.stringify(doc).substring(0, 200))
            }

            if (this.getHTML() == doc.html) {
                if (verbose) {
                    console.log(title, '更新节点，没变化，忽略')
                }
                return
            }

            this.doc = doc
        },

        updateDoc(doc: EditorDoc) {
            let verbose = true;

            this.setMessage("UpdateDoc")

            if (doc instanceof Error) {
                this.setError(doc)
                console.error(title, 'UpdateDoc', doc.message)
                return
            }

            if (doc instanceof EditorDoc == false) {
                console.error(title, 'UpdateDoc', 'doc is not instance of EditorDoc', doc)
                return
            }

            if (this.getHTML() == doc.html) {
                if (verbose) {
                    console.log(title, '更新节点，没变化，忽略')
                }
                return
            }

            if (verbose) {
                console.log(title, 'updateDoc', doc)
            }

            this.doc = doc

            if (doc.html != this.getHTML()) {
                return new Error('content not match')
            }
        }
    },
})

export type DocStore = ReturnType<typeof useDocStore>
