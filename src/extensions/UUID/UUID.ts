import { Extension } from '@tiptap/core'
import { v4 as uuidv4 } from 'uuid'

const UUID = Extension.create({
    name: 'uuid',

    addGlobalAttributes() {
        return [
            {
                types: ['paragraph', 'heading', 'a'],
                attributes: {
                    uuid: {
                        default: null,
                        parseHTML: (element: { getAttribute: (arg0: string) => any }) => element.getAttribute('data-uuid'),
                        renderHTML: (attributes: { uuid: any }) => {
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

    onCreate() {
        this.editor.state.doc.descendants((node: { type: { name: string }; attrs: { uuid: any } }, pos: any) => {
            if (node.type.name === 'paragraph' || node.type.name === 'heading') {
                if (!node.attrs.uuid) {
                    this.editor.commands.updateAttributes(node.type.name, { uuid: uuidv4() }, { at: pos })
                }
            }
        })
    },
})

export default UUID