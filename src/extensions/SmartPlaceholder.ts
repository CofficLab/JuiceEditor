import { Placeholder } from '@tiptap/extension-placeholder'
import Heading from '@tiptap/extension-heading'

export const SmartPlaceholder = Placeholder.configure({
    placeholder: ({ node }) => {
        if (node.type.name === Heading.name && node.attrs.level == 1) {
            return '输入标题'
        }

        return '输入内容'
    }
})

export default SmartPlaceholder