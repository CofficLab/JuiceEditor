import { Node } from '@tiptap/core'

export interface RootOptions {
    HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        root: {
            updateRootUUID: (uuid: string) => ReturnType
        }
    }
}

export const Root = Node.create<RootOptions>({
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

    addCommands() {
        return {
            updateRootUUID: (uuid: string) => ({ editor, commands }) => {
                commands.updateAttributes(this.name, {
                    uuid: uuid
                })

                return true
            }
        }
    }
})