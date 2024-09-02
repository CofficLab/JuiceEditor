<template>
  <!-- 回车后显示的菜单 -->
  <div>
    <floating-menu :tippy-options="{
      duration: 100,
      maxWidth: 800,
      placement: 'top',
      appendTo: 'parent'
    }" :editor="editor" :should-show="shouldShowFloatingMenu">
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
import Heading from './ButtonHeading.vue'
import Image from './ButtonImage.vue'
import Draw from './ButtonDraw.vue'
import Table from './ButtonTable.vue'
import TaskList from './ButtonTaskList.vue'
import SmartPre from './ButtonSmartPre.vue'
import ButtonBar from '../ui/ButtonBar.vue'
import Kbd from './ButtonKbd.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const shouldShowFloatingMenu = TiptapAgent.shouldShowFloatingMenu
</script>
