import { Node } from '@tiptap/core'
import UUIDHelper from '../helper/UUIDHelper'
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

export const Root = Node.create<BranchOptions>({
    name: 'root',

    group: 'block',

    content: 'block+',

    addStorage() {
        return {
            verbose: true,
            emoji: '🌲 Root',
        }
    },

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    addAttributes() {
        return {
            uuid: {
                parseHTML: element => element.getAttribute('data-uuid') || '',
                renderHTML: attributes => ({
                    'data-uuid': attributes.uuid,
                }),
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="root"]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', { 'data-type': 'root', ...HTMLAttributes }, 0]
    },
})
