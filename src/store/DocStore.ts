import { defineStore } from 'pinia'
import EditorDoc from '../model/EditorDoc'
import Config from '../config/config'
import MarkdownHelper from '../helper/MarkdownHelper'
import SmartMessage from '../model/SmartMessage'
import EditorData from '../model/EditorData'
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

        updateDoc(data: EditorData) {
            let verbose = false;

            this.setMessage("UpdateDoc")

            if (data instanceof EditorData == false) {
                console.error(title, 'UpdateDoc', 'data is not object', data)
                throw new Error('data is not object')
            }

            if (data.title == undefined) {
                throw new Error('doc.title is undefined')
            }

            if (this.getContent() == data.content) {
                if (verbose) {
                    console.log(title, '更新节点，没变化，忽略')
                }
                return
            }

            if (verbose) {
                console.log(title, 'updateDoc', data)
            }

            this.doc = this.doc.updateFromEditorData(data)

            if (data.content != this.getContent()) {
                throw new Error('content not match')
            }
        }
    },
})

export type DocStore = ReturnType<typeof useDocStore>
