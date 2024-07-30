import { Node } from '@tiptap/core'
import Text from '@tiptap/extension-text'
import SmartCodeVue from '../SmartCode/SmartCode.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-3'


const SmartText = Text.extend({
    name: 'text',

    inline: true,
    group: 'inline',
    selectable: true,

    // 定义文本的 HTML 标签
    toDOM() {
        return ['span', { style: 'color: blue;' }, 0]
    },

    parseHTML() {
        return [{ tag: 'spanx' }]
    },

})

export default SmartText
