<template>
  <node-view-wrapper class="toc">
    <div class="overflow-y-scroll w-full h-2/3">
      <ul style="padding-left: 0">
        <template v-for="(heading, index) in headings" :key="index">
          <li style="margin: 0">
            <a :href="getLink(heading)">
              <DynamicPadding :count="heading.level - 1"></DynamicPadding>
              {{ heading.text }}
            </a>
          </li>
        </template>
      </ul>
    </div>
    <!-- <ul>
      <li><a>Item 1</a></li>
      <li>
        <a>Parent</a>
        <ul>
          <li><a>Submenu 1</a></li>
          <li><a>Submenu 2</a></li>
          <li>
            <a>Parent</a>
            <ul>
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li><a>Item 3</a></li>
    </ul> -->
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import DynamicPadding from './DynamicPadding.vue'
import { onMounted, nextTick, ref, onUnmounted } from 'vue'

class Heading {
  level!: number
  text!: string
  id!: string
}

const props = defineProps(nodeViewProps)

let headings = ref<Heading[]>([])

let getLink = function (heading: { id: any }) {
  return `#${heading.id}`
}

let handleUpdate = function () {
  console.log('Toc: handle update')
  headings.value = []
  const transaction = props.editor.state.tr

  props.editor.state.doc.descendants((node: any, pos: any) => {
    if (node.type.name === 'heading') {
      const id = `heading-${headings.value.length + 1}`

      if (node.attrs.id !== id) {
        transaction.setNodeMarkup(pos, undefined, { ...node.attrs, id })
      }

      headings.value.push({
        level: node.attrs.level,
        text: node.textContent,
        id
      })
    }
  })

  transaction.setMeta('addToHistory', false)
  transaction.setMeta('preventUpdate', false)

  props.editor.view.dispatch(transaction)
}

onMounted(() => {
  console.log('Toc: mounted')
  props.editor.on('update', handleUpdate)
  nextTick(() => handleUpdate())

  // 监听滚动的距离以高亮toc菜单
  // document.addEventListener('scroll', function (e) {
  //   // 已经滚动了多少距离
  //   // console.log(document.querySelector('h1'))
  //   var scrollTop = (document.querySelector('h1') as HTMLElement).scrollTop
  //   // console.log('已滚动' + scrollTop)
  //   // 正文DOM
  //   var proseDom = document.getElementsByClassName('prose').item(0)
  //   // 正文里的标题
  //   var titleDoms = proseDom?.querySelectorAll('h2,h3,h4')

  //   if (!titleDoms) return

  //   for (var i = 0; i < titleDoms.length; i++) {
  //     var title = titleDoms.item(i)
  //     if (!title) return

  //     // 当前标题离顶部的距离
  //     var offsetTop = (title as HTMLElement).offsetTop
  //     if (scrollTop - offsetTop > 0 && scrollTop - offsetTop < 20) {
  //       console.log(title + 'offset= ' + offsetTop)
  //       var aDoms = document.getElementsByClassName('toc').item(0)?.getElementsByTagName('a')
  //       if (!aDoms) {
  //         return
  //       }

  //       for (var j = 0; j < aDoms.length; j++) {
  //         var a = aDoms.item(j)
  //         if (a != null && a.attributes['href'].nodeValue == '#' + title?.id) {
  //           a.classList.add('bg-sky-300/30')
  //         } else {
  //           a?.classList.remove('bg-sky-300/30')
  //         }
  //       }
  //     }
  //   }
  // })
})

onUnmounted(() => {
  console.log('Toc: unmounted')
  props.editor.off('update', handleUpdate)
})
</script>

<style lang="postcss" scoped>
.toc {
  @apply fixed h-full top-0 w-36 md:w-40 xl:w-48 2xl:w-56 right-3 z-50 flex justify-end items-start pt-12;
  ul {
    @apply menu w-full dark:border-gray-700/50 backdrop-blur-sm backdrop-filter border-l !important;

    li {
      @apply list-none text-xs rounded-none !important;

      a {
        @apply no-underline rounded-none !important;
      }
    }
  }
}
</style>
