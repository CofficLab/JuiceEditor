import { Placeholder } from '@tiptap/extension-placeholder'
import { HEADING } from '../config/nodes'

export const SmartPlaceholder = Placeholder.configure({
    placeholder: ({ node }) => {
        if (node.type.name === HEADING && node.attrs.level == 1) {
            return '输入标题'
        }

        return ''
    }
})

export default SmartPlaceholder