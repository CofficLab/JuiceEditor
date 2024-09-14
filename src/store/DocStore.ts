import { defineStore } from 'pinia'
import EditorData from '../model/EditorData'
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
            doc: null as EditorData | null,
            monacoLink: config.monacoLink,
            selectionType: '',
        }
    },

    actions: {
        setMessage(text: string) {
            this.message = new SmartMessage(title + ": " + text)
        },

        setDebug(text: string) {
            this.message = new SmartMessage(title + ": " + text, "debug")
        },

        setError(error: Error) {
            let verbose = true

            if (verbose) {
                console.log(title, 'setError', error)
            }

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

        getMarkdown(): string | undefined {
            const html = this.getHTML()
            return html ? MarkdownHelper.html2markdown(html) : undefined
        },

        updateSelectionType(type: string) {
            if (type == this.selectionType) return

            this.selectionType = type
        },

        getDoc(): EditorData | null {
            return this.doc
        },

        setDoc(doc: EditorData | null, reason: string) {
            let verbose = true;

            if (verbose) {
                console.log(title, `setDoc(${reason})`, doc)

                if (doc) {
                    this.setDebug("SetDoc: " + JSON.stringify(doc).substring(0, 200))
                } else {
                    this.setDebug("SetDoc: null")
                }
            }

            if (this.getHTML() == doc?.html && this.doc?.title == doc?.title) {
                if (verbose) {
                    console.log(title, 'SetDoc，没变化，忽略')
                }
                return
            }

            this.doc = doc
        },

        updateDoc(doc: EditorData, reason: string) {
            let verbose = true;
            let verbose2 = false;

            if (verbose) {
                this.setDebug(`UpdateDoc(${reason})`)
            }

            if (doc instanceof Error) {
                this.setError(doc)
                console.error(title, 'UpdateDoc', doc.message)
                return
            }

            if (doc instanceof EditorData == false) {
                console.error(title, 'UpdateDoc', 'doc is not instance of EditorDoc', doc)
                return
            }

            if (this.getDoc()?.hasSameHtmlAndTitle(doc)) {
                if (verbose2) {
                    console.log(title, 'UpdateDoc，没变化，忽略')
                }
                return
            }

            if (verbose) {
                console.log(title, `updateDoc(${reason})`, doc)
            }

            this.doc = doc

            if (doc.html != this.getHTML()) {
                return new Error('content not match')
            }
        }
    },
})

export type DocStore = ReturnType<typeof useDocStore>
