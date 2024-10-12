<script lang="ts" setup>
import { Editor, FloatingMenu } from '@tiptap/vue-3'
import TiptapAgent from '../helper/TiptapHelper'
import Heading from '../buttons/ButtonHeading.vue'
import Image from '../buttons/ButtonImage.vue'
import Draw from '../buttons/ButtonDraw.vue'
import Table from '../buttons/ButtonTable.vue'
import TaskList from '../buttons/ButtonTaskList.vue'
import SmartPre from '../buttons/ButtonSmartPre.vue'
import ButtonBar from '../ui/ButtonBar.vue'
import Kbd from '../buttons/ButtonKbd.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  },
  shape: {
    type: String,
    default: 'rectangle'
  }
})

const shouldShowFloatingMenu = TiptapAgent.shouldShowFloatingMenu
</script>
<template>
  <!-- 回车后显示的菜单 -->
  <div>
    <floating-menu :tippy-options="{
      duration: 100,
      maxWidth: 800,
      placement: 'top',
      appendTo: 'parent'
    }" :editor="editor" :should-show="shouldShowFloatingMenu">
      <ButtonBar type="blue" :shape="shape">
        <Heading :editor="editor" :level="2" :shape="shape" />
        <Heading :editor="editor" :level="3" :shape="shape" />
        <Heading :editor="editor" :level="4" :shape="shape" />
        <Heading :editor="editor" :level="5" :shape="shape" />
        <Heading :editor="editor" :level="6" :shape="shape" />
        <Image :editor="editor" :shape="shape" />
        <Draw :editor="editor" :shape="shape" />
        <TaskList :editor="editor" :shape="shape" />
        <Table :editor="editor" :shape="shape"></Table>
        <SmartPre :editor="editor" :shape="shape"></SmartPre>
        <Kbd :editor="editor" :shape="shape"></Kbd>
      </ButtonBar>
    </floating-menu>
  </div>
</template>
