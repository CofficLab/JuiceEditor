import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './Features.vue'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        features: {
            setContentFeatures: () => ReturnType
        }
    }
}

export default Node.create({
    name: 'features',

    group: 'block',

    atom: true,

    addCommands() {
        return {
            setContentFeatures: () => ({ editor, commands }) => {
                commands.setContent('<h1>宣传图</h1><features-component></features-component>', true)
                return true
            }
        }
    },

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