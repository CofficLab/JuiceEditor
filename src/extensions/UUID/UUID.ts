import { Extension } from '@tiptap/core'
import { Node } from 'prosemirror-model'
import { v4 as uuidv4 } from 'uuid'

let emoji = '🌌 UUID'

const UUID = Extension.create({
    name: 'uuid',

    addOptions() {
        return {
            types: ['paragraph', 'heading', 'a', 'pre', 'table', 'taskList']
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
        console.log(emoji, 'onBeforeCreate')
    },

    onCreate() {
        console.log(emoji, 'create')

        // this.editor.state.doc.descendants((node: Node, pos: number) => {
        //     if (node.type.name === 'paragraph' || node.type.name === 'heading') {
        //         if (!node.attrs.uuid) {
        //             console.log(emoji, 'set uuid for', node.type.name)
        //             let tr = this.editor.state.tr
        //             tr.setNodeMarkup(pos, void 0, { ...node.attrs, uuid: uuidv4() })
        //             this.editor.view.dispatch(tr)
        //         }
        //     }
        // })
    },

    onUpdate() {
        console.log(emoji, 'onUpdate')
        this.editor.state.doc.descendants((node: Node, pos: number) => {
            if (this.options.types.includes(node.type.name)) {
                if (!node.attrs.uuid) {
                    console.log(emoji, 'set uuid for', node.type.name)
                    let tr = this.editor.state.tr
                    tr.setNodeMarkup(pos, void 0, { ...node.attrs, uuid: uuidv4() })
                    this.editor.view.dispatch(tr)
                }
            }
        })
    }
})

export default UUID