<template>
  <!-- 右键菜单 -->
  <div id="custom-menu">
    <ul>
      <!-- <li class="menu-title">Title</li> -->
      <li>
        <a><Heading :editor="editor" :level="2" :icon-only="false" /></a>
      </li>
      <li>
        <a><Heading :editor="editor" :level="3" :icon-only="false" /></a>
      </li>
      <li>
        <a><Heading :editor="editor" :level="4" :icon-only="false" /></a>
      </li>
      <li>
        <a><Heading :editor="editor" :level="5" :icon-only="false" /></a>
      </li>
      <li>
        <a><Heading :editor="editor" :level="6" :icon-only="false" /></a>
      </li>
      <li>
        <a><Paragraph :editor="editor" :icon-only="false"></Paragraph></a>
      </li>
      <li v-if="!editor.isActive('heading')">
        <a><Bold :editor="editor" :icon-only="false"></Bold></a>
      </li>
      <li>
        <a href=""><Italic :editor="editor" :icon-only="false"></Italic></a>
      </li>
      <li>
        <a href=""><StrikeVue :editor="editor" :icon-only="false"></StrikeVue></a>
      </li>
      <li>
        <a href=""><BulletList :editor="editor" :icon-only="false"></BulletList></a>
      </li>
      <li>
        <a><Code :editor="editor" :icon-only="false"></Code></a>
      </li>
      <li>
        <a href=""><Link :editor="editor" :icon-only="false"></Link></a>
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
  @apply bg-base-300 rounded-md absolute shadow-lg border border-gray-500/20;

  ul {
    @apply p-1 menu;
  }
  a {
    @apply cursor-default text-sm py-1 rounded;
  }

  button {
    @apply px-1 flex  !important;

    svg {
      @apply m-0;
    }
  }

  button:disabled {
    @apply bg-gray-700/40;
  }
}
</style>
