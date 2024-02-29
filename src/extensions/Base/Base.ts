import { Node } from '@tiptap/vue-3'

function closeAllDetails(event: MouseEvent) {
  let target = event.target as HTMLElement

  // 如果点击在了 dropdown-content 内，忽略
  if (target && target.closest('.dropdown-content')) {
    return
  }

  console.log('🍋 Base: closeAllDetails')
  let details = document.querySelectorAll('details')
  for (let i = 0; i < details.length; i++) {
    details[i].open = false
  }
}

export const Base = Node.create({
  name: 'base',

  onDestroy() {
    console.log('🍋 Base: onTiptapDestroy')
    document.removeEventListener('click', closeAllDetails)
  },

  onCreate() {
    console.log('🍋 Base: onTiptapCreate')
    document.addEventListener('click', closeAllDetails)
  },
})
