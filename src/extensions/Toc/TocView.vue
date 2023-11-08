<template>
  <node-view-wrapper class="toc">
    <ul style="padding-left: 0">
      <div v-for="(heading, index) in headings">
        <li style="margin: 0" :key="index">
          <a :href="getLink(heading)">
            <DynamicPadding :count="heading.level - 1"></DynamicPadding>
            {{ heading.text }}
          </a>
        </li>
      </div>
    </ul>
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
  console.log('TOC: handle update')
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
  console.log('TOC: mounted')
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
  console.log('TOC: unmounted')
  props.editor.off('update', handleUpdate)
})
</script>

<style lang="postcss" scoped>
.toc {
  @apply flex;
  ul {
    @apply menu fixed right-3 top-32 z-30 w-36 overflow-scroll border-l dark:border-gray-700/50 backdrop-blur-sm backdrop-filter md:w-40 xl:w-48 2xl:w-56;

    li {
      @apply list-none text-xs rounded-none !important;

      a {
        @apply no-underline rounded-none !important;
      }
    }
  }
}
</style>
