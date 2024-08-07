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
      <ButtonBar>
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
      </ButtonBar>
    </floating-menu>
  </div>
</template>

<script lang="ts" setup>
import { Editor, FloatingMenu } from '@tiptap/vue-3'
import TiptapAgent from './TiptapAgent'
import Heading from '../operators/Heading.vue'
import Banner from '../operators/Banner.vue'
import Image from '../operators/Image.vue'
import Draw from '../operators/Draw.vue'
import Table from '../operators/Table.vue'
import TaskList from '../operators/TaskList.vue'
import SmartPre from '../operators/SmartPre.vue'
import GroupPre from '../operators/GroupPre.vue'
import ButtonBar from '../../ui/ButtonBar.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const shouldShowFloatingMenu = TiptapAgent.shouldShowFloatingMenu
</script>
