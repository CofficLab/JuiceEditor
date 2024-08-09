<template>
  <NodeViewWrapper
    class="h-full top-0 w-36 md:w-40 xl:w-48 2xl:w-56 right-3 z-40 flex justify-end items-start pt-24"
  >
    <div class="overflow-y-scroll w-full h-2/3">
      <ul
        style="padding-left: 0"
        class="menu w-full dark:border-gray-700/50 backdrop-blur-sm backdrop-filter border-l border-gray-400/50"
      >
        <template v-for="(heading, index) in headings" :key="index">
          <li style="margin: 0" class="list-none text-xs rounded-none">
            <a :href="getLink(heading)" class="no-underline rounded-none p-1">
              <DynamicPadding :count="heading.level - 1"></DynamicPadding>
              {{ heading.text }}
            </a>
          </li>
        </template>
      </ul>
    </div>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import DynamicPadding from './DynamicPadding.vue'
import { onMounted, nextTick, ref, onBeforeUnmount, computed } from 'vue'
import Heading from './Heading'

const props = defineProps(nodeViewProps)
const uuid = computed(() => props.editor.options.injectNonce)

let headings = ref<Heading[]>([])

let getLink = function (heading: { id: any }) {
  return `#${heading.id}`
}

let handleUpdate = function () {
  // if (props.editor.options.injectNonce != uuid) {
  //   console.log('🍋 📖 Toc: 查找 Headings，非当前UUID，忽略')
  //   return
  // }

  Heading.getHeadings(props.editor)
}

onMounted(() => {
  console.log('🍋 📖 Toc: mounted，Tiptap UUID -> ', uuid)
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

onBeforeUnmount(() => {
  console.log('🍋 📖 Toc: onBeforeUnmount，destroy listener for Tiptap UUID', uuid)
  props.editor.off('update', handleUpdate)
})
</script>
