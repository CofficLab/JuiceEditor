<template>
  <!-- 右键菜单 -->
  <div id="custom-menu">
    <ul>
      <!-- <li class="menu-title">Title</li> -->
      <li>
        <Heading :editor="editor" :level="2" :icon-only="false" />
      </li>
      <li>
        <Heading :editor="editor" :level="3" :icon-only="false" />
      </li>
      <li>
        <Heading :editor="editor" :level="4" :icon-only="false" />
      </li>
      <li>
        <Heading :editor="editor" :level="5" :icon-only="false" />
      </li>
      <li>
        <Heading :editor="editor" :level="6" :icon-only="false" />
      </li>
      <div class="border-t border-gray-300 my-1"></div>
      <li>
        <Paragraph :editor="editor" :icon-only="false"></Paragraph>
      </li>
      <li v-if="!editor.isActive('heading')">
        <Bold :editor="editor" :icon-only="false"></Bold>
      </li>
      <li>
        <Italic :editor="editor" :icon-only="false"></Italic>
      </li>
      <li>
        <StrikeVue :editor="editor" :icon-only="false"></StrikeVue>
      </li>
      <li>
        <BulletList :editor="editor" :icon-only="false"></BulletList>
      </li>
      <li>
        <Code :editor="editor" :icon-only="false"></Code>
      </li>
      <li>
        <Link :editor="editor" :icon-only="false"></Link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { Editor } from '@tiptap/vue-3'
import Bold from '../operators/Bold.vue'
import Heading from '../operators/Heading.vue'
import Italic from '../operators/Italic.vue'
import Paragraph from '../operators/Paragraph.vue'
import StrikeVue from '../operators/Strike.vue'
import BulletList from '../operators/BulletList.vue'
import Code from '../operators/Code.vue'
import Link from '../operators/Link.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

onMounted(() => {
  document.addEventListener('contextmenu', function (event) {
    let nodeName = (event.target as HTMLElement).nodeName
    if (nodeName == 'H2') {
      event.preventDefault()
      var customMenu = document.getElementById('custom-menu')!
      customMenu.style.left = event.pageX + 'px'
      customMenu.style.top = event.pageY + 'px'
      customMenu.style.display = 'block'
    }
  })

  document.addEventListener('click', function (event) {
    var customMenu = document.getElementById('custom-menu')!
    console.log(customMenu)
    customMenu.style.display = 'none'
  })
})
</script>

<style lang="postcss">
#custom-menu {
  @apply bg-base-300 w-36 min-w-min hidden rounded-md absolute shadow-lg border border-gray-500/20;

  ul {
    @apply p-1 menu;
    li {
      @apply text-xs py-0 m-0 rounded;
    }
  }

  button {
    @apply px-3 py-1 flex cursor-default rounded  !important;

    svg {
      @apply m-0;
    }
  }

  button:disabled {
    @apply bg-gray-700/40;
  }
}
</style>
