import { Bold } from '@tiptap/extension-bold'

export const SmartBold = Bold.configure({
    HTMLAttributes: {
        class: 'bold-class',
    },
})

export default SmartBold