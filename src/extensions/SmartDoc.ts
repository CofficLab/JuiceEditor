import { Document } from '@tiptap/extension-document'
import { ROOT } from '../config/nodes'

export const SmartDoc = Document.extend({
    topNode: false,
    content: ROOT,
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