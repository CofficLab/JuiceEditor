import { Document } from '@tiptap/extension-document'
import { Root } from './Root'

export const SmartDoc = Document.extend({
    topNode: false,
    content: Root.name,
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
    renderHTML({ HTMLAttributes }) {
        return ['div', { 'data-type': 'doc', ...HTMLAttributes }, 0]
    },
})

export default SmartDoc