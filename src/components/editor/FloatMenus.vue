<template>
  <!-- 回车后显示的菜单 -->
  <div>
    <floating-menu
      class="floating-menu"
      :tippy-options="{
        duration: 100,
        maxWidth: 800,
        placement: 'top',
        appendTo: 'parent'
      }"
      :editor="editor"
      :should-show="shouldShowFloatingMenu"
    >
      <Heading :editor="editor" :level="2" />
      <Heading :editor="editor" :level="3" />
      <Heading :editor="editor" :level="4" />
      <Heading :editor="editor" :level="5" />
      <Heading :editor="editor" :level="6" />
      <Banner :editor="editor" />
      <Image :editor="editor" />
      <Draw :editor="editor" />
      <TaskList :editor="editor" />
      <Table :editor="editor"></Table>
      <SmartPre :editor="editor"></SmartPre>
      <GroupPre :editor="editor"></GroupPre>
    </floating-menu>
  </div>
</template>

<script lang="ts" setup>
import { Editor, FloatingMenu } from '@tiptap/vue-3'
import TiptapAgent from './TiptapAgent'
import Heading from '../operators/Heading.vue'
import CodeBlock from '../operators/CodeBlock.vue'
import Banner from '../operators/Banner.vue'
import Image from '../operators/Image.vue'
import Draw from '../operators/Draw.vue'
import Table from '../operators/Table.vue'
import TaskList from '../operators/TaskList.vue'
import SmartPre from '../operators/SmartPre.vue'
import GroupPre from '../operators/GroupPre.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const shouldShowFloatingMenu = TiptapAgent.shouldShowFloatingMenu
</script>

<style scoped lang="postcss">
.floating-menu {
  @apply bg-info/95 text-info-content rounded-md px-2 py-1 flex flex-row flex-wrap ml-2;

  button {
    @apply btn btn-sm btn-ghost px-1;
  }
}
</style>
