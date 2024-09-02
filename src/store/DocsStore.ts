import { defineStore } from 'pinia'
import EditorDoc from '../model/EditorDoc'
import Config from '../config/config'
import MarkdownHelper from '../helper/MarkdownHelper'
import SmartMessage from '../model/SmartMessage'

const config = Config
const isDebug = config.isDebug
const title = "🍋 DocsStore"

export const useDocsStore = defineStore('docs-store', {
    state: () => {
        return {
            message: new SmartMessage(""),
            docs: [] as EditorDoc[],
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

        getDocs(): EditorDoc[] {
            return this.docs
        },

        setDocs(docs: EditorDoc[]) {
            let verbose = false;

            if (verbose) {
                console.log(title, 'setDocs', docs)
            }

            this.setMessage("SetDocs: " + JSON.stringify(docs))

            this.docs = docs
        },

        appendDoc(doc: EditorDoc) {
            this.docs.push(doc)
        },

        upsertDoc(doc: EditorDoc) {
            var docs = this.docs
            if (this.hasDoc(doc.uuid)) {
                docs[docs.findIndex(d => d.uuid === doc.uuid)] = doc
            } else {
                docs.push(doc)
            }

            this.docs = docs

            console.log('docs upsert', this.docs.length)
        },

        hasDoc(uuid: string): boolean {
            return this.docs.some(doc => doc.uuid === uuid)
        },

        getDoc(uuid: string): EditorDoc | undefined {
            return this.docs.find(doc => doc.uuid === uuid)
        },
    },
})

export type DocsStore = ReturnType<typeof useDocsStore>
