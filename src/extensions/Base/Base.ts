import { Node } from '@tiptap/vue-3'

export const Base = Node.create({
  name: 'base',

  onDestroy() {
    //console.log('🍋 Base: onTiptapDestroy')
  },

  onCreate() {
    //console.log('🍋 Base: onTiptapCreate')
  },
})
