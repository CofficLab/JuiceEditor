import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from './Features.vue'

export default Node.create({
    name: 'features',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            count: {
                default: 0,
            },
            uuid: {
                default: 'features',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'features-component',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['features-component', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return VueNodeViewRenderer(Component as any)
    },
})