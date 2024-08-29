import { Extension } from '@tiptap/core'
import { Node } from 'prosemirror-model'
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

    onCreate() {
        this.editor.state.doc.descendants((node: Node, pos: number) => {
            if (node.type.name === 'paragraph' || node.type.name === 'heading') {
                if (!node.attrs.uuid) {
                    this.editor.commands.updateAttributes(node.type.name, {
                        uuid: uuidv4()
                    })
                }
            }
        })
    },
})

export default UUID