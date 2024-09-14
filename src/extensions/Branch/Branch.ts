import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import BranchVue from './Branch.vue'

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

export const Branch = Node.create<BranchOptions>({
    name: 'branch',

    group: 'block',

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    content: 'branchContent+',

    addAttributes() {
        return {
            currentVersion: {
                default: 0,
                parseHTML: element => parseInt(element.getAttribute('data-current-version') || '0'),
                renderHTML: attributes => ({
                    'data-current-version': attributes.currentVersion,
                }),
            },
        }
    },

    addNodeView() {
        return VueNodeViewRenderer(BranchVue)
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="branch"]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', { 'data-type': 'branch', ...HTMLAttributes }, 0]
    },

    addCommands() {
        return {
            setBranchVersion: (version: number) => ({ tr, state, dispatch }) => {
                if (dispatch) {
                    const { from, to } = state.selection
                    tr.doc.nodesBetween(from, to, (node, pos) => {
                        if (node.type === this.type) {
                            tr.setNodeAttribute(pos, 'currentVersion', version)
                            return false
                        }
                    })
                }
                return true
            },
        }
    },
})
