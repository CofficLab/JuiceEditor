import { Extension } from '@tiptap/core'
import { Node } from 'prosemirror-model'
import { A, BLOCKQUOTE, BULLET_LIST, HEADING, IMAGE, PARAGRAPH, PRE, TABLE, TASKLIST, TEXT } from '../../config/nodes'
import { v4 as uuidv4 } from 'uuid'

let emoji = '🌌 UUID'

const UUID = Extension.create({
    name: 'uuid',

    addOptions() {
        return {
            types: [PARAGRAPH, HEADING, TEXT, PRE, TASKLIST, IMAGE, TABLE, A, BLOCKQUOTE, BULLET_LIST]
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    uuid: {
                        default: null,
                        parseHTML: element => element.getAttribute('data-uuid'),
                        renderHTML: attributes => {
                            if (!attributes.uuid) {
                                return {}
                            }
                            return { 'data-uuid': attributes.uuid }
                        },
                    },
                },
            },
        ]
    },

    /**
     * The editor is not ready yet.
     */
    onBeforeCreate() {
        let verbose = false
        if (verbose) {
            console.log(emoji, 'onBeforeCreate')
        }
    },

    onCreate() {
        let verbose = false

        if (verbose) {
            console.log(emoji, 'create')
        }
    },

    onUpdate() {
        let verbose = false
        let verbose2 = false

        if (verbose) {
            console.log(emoji, 'onUpdate')
        }

        let tr = this.editor.state.tr
        this.editor.state.doc.descendants((node: Node, pos: number) => {
            if (this.options.types.includes(node.type.name)) {
                if (!node.attrs.uuid) {
                    if (verbose2) {
                        console.log(emoji, 'set uuid for', node.type.name, node.textContent, node.attrs)
                    }

                    tr.setNodeMarkup(pos, void 0, { ...node.attrs, uuid: uuidv4() })
                }
            }
        })

        if (tr.docChanged) {
            if (verbose2) {
                console.log(emoji, 'dispatch')
            }
            this.editor.view.dispatch(tr)
        }
    }
})

export default UUID