import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import BranchContentVue from './BranchContent.vue'


export interface BranchOptions {
    HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        branch: {
            setBranchVersion: (version: number) => ReturnType
        }
    }
}

export const BranchContent = Node.create<BranchOptions>({
    name: 'branchContent',

    group: 'block',

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    addNodeView() {
        return VueNodeViewRenderer(BranchContentVue)
    },

    addAttributes() {
        return {
            version: {
                default: 0,
                parseHTML: element => parseInt(element.getAttribute('data-version') || '0'),
                renderHTML: attributes => ({
                    'data-version': attributes.version,
                }),
            },
        }
    },

    content: 'block+',

    parseHTML() {
        return [
            {
                tag: 'div[data-type="branch-content"]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', { 'data-type': 'branch-content', ...HTMLAttributes }, 0]
    },
})
