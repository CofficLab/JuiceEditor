import { defineStore } from 'pinia'
import EditorDoc from '../model/EditorDoc'
import SmartMessage from '../model/SmartMessage'

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

        getDocs(): EditorDoc[] {
            return this.docs
        },

        setDocs(docs: EditorDoc[]) {
            let verbose = false;

            if (verbose) {
                console.log(title, 'setDocs', docs, docs.length)
            }

            this.setMessage("SetDocs: " + JSON.stringify(docs))

            this.docs = docs
        },

        appendDoc(doc: EditorDoc) {
            this.docs.push(doc)
        },

        upsertDoc(doc: EditorDoc) {
            var docs = this.docs
            if (this.hasDoc(doc.getDocUUID())) {
                docs[docs.findIndex(d => d.getDocUUID() === doc.getDocUUID())] = doc
            } else {
                docs.push(doc)
            }

            this.docs = docs
        },

        hasDoc(uuid: string): boolean {
            return this.docs.some(doc => doc.getDocUUID() === uuid)
        },

        getDoc(uuid: string): EditorDoc | undefined {
            return this.docs.find(doc => doc.getDocUUID() === uuid)
        },
    },
})

export type DocsStore = ReturnType<typeof useDocsStore>
