<template>
  <!-- 回车后显示的菜单 -->
  <div>
    <floating-menu
      :tippy-options="{
        duration: 100,
        maxWidth: 800,
        placement: 'top',
        appendTo: 'parent'
      }"
      :editor="editor"
      :should-show="shouldShowFloatingMenu"
    >
      <ButtonBar type="blue">
        <Heading :editor="editor" :level="2" />
        <Heading :editor="editor" :level="3" />
        <Heading :editor="editor" :level="4" />
        <Heading :editor="editor" :level="5" />
        <Heading :editor="editor" :level="6" />
        <Image :editor="editor" />
        <Draw :editor="editor" />
        <TaskList :editor="editor" />
        <Table :editor="editor"></Table>
        <SmartPre :editor="editor"></SmartPre>
        <Kbd :editor="editor"></Kbd>
      </ButtonBar>
    </floating-menu>
  </div>
</template>

<script lang="ts" setup>
import { Editor, FloatingMenu } from '@tiptap/vue-3'
import TiptapAgent from '../helper/TiptapHelper'
import Heading from './operators/Heading.vue'
import Image from './operators/Image.vue'
import Draw from './operators/Draw.vue'
import Table from './operators/Table.vue'
import TaskList from './operators/TaskList.vue'
import SmartPre from './operators/SmartPre.vue'
import ButtonBar from '../ui/ButtonBar.vue'
import Kbd from './operators/Kbd.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const shouldShowFloatingMenu = TiptapAgent.shouldShowFloatingMenu
</script>
