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
            doc: EditorDoc.makeDefaultDoc(),
            drawLink: config.drawLink,
            monacoLink: config.monacoLink,
            selectionType: '',
        }
    },

    actions: {
        setMessage(text: string) {
            this.message = new SmartMessage(title + ": " + text)
        },

        closeDraw: function () {
            let verbose = false;
            if (verbose) {
                console.log(title, 'close draw')
            }
            document.dispatchEvent(new CustomEvent('close-draw'))
        },

        getContent(): string {
            return this.getDoc().content
        },

        getJSON(): string {
            return JSON.stringify(this.getDoc().json)
        },

        getDrawLink(): string {
            return this.drawLink
        },

        getMarkdown(): string {
            return MarkdownHelper.html2markdown(this.getContent())
        },

        setDrawLink: function (link: string) {
            this.drawLink = link
        },

        updateSelectionType(type: string) {
            if (type == this.selectionType) return

            this.selectionType = type
        },

        getDoc(): EditorDoc {
            if (this.doc.title == undefined) {
                throw new Error('doc.title is undefined')
            }
            return this.doc
        },

        getUUID(): string {
            return this.getDoc().uuid
        },

        setDoc(doc: EditorDoc) {
            let verbose = false;

            if (verbose) {
                console.log(title, 'setDoc', doc)
            }

            if (doc.title == undefined) {
                throw new Error('doc.title is undefined')
            }

            this.setMessage("SetDoc: " + JSON.stringify(doc))

            this.doc = doc
        },

        updateDoc(doc: EditorDoc) {
            let verbose = false;

            this.setMessage("UpdateDoc")

            if (doc instanceof EditorDoc == false) {
                console.error(title, 'UpdateDoc', 'doc is not object', doc)
                throw new Error('doc is not object')
            }

            if (doc.title == undefined) {
                throw new Error('doc.title is undefined')
            }

            if (this.getContent() == doc.content) {
                if (verbose) {
                    console.log(title, '更新节点，没变化，忽略')
                }
                return
            }

            if (verbose) {
                console.log(title, 'setDoc', doc)
            }

            this.doc = doc

            if (doc.content != this.getContent()) {
                throw new Error('content not match')
            }
        }
    },
})

export type DocStore = ReturnType<typeof useDocStore>
