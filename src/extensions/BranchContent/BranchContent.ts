import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import BranchContentVue from './BranchContent.vue'
import UUIDHelper from '../../helper/UUIDHelper';


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

const BranchContent = Node.create<BranchOptions>({
    name: 'branchContent',

    group: 'block',

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    addNodeView() {
        return VueNodeViewRenderer(BranchContentVue as any)
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
            uuid: {
                default: UUIDHelper.generate("BranchContent"),
                parseHTML: (element) => {
                    return element.getAttribute('data-uuid') || UUIDHelper.generate("BranchContent")
                }
            }
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

export default BranchContent