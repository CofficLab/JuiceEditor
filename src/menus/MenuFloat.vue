<script lang="ts" setup>
import { FloatingMenu } from '../model/TiptapGroup'
import { TiptapEditor } from '../model/TiptapGroup'
import { shouldShowFloatingMenu } from '../extensions/SmartMenus'
import ButtonGroup from '../ui/ButtonGroup.vue'
import Button from '../ui/Button.vue'
import {
  RiH2, RiH3, RiH4, RiEdit2Line, RiListCheck, RiTaskFill,
  RiTable2, RiCodeBlock, RiKeyboardBoxLine, RiChatQuoteLine
} from '@remixicon/vue'

defineProps({
  editor: {
    type: TiptapEditor,
    required: true
  },
  shape: {
    type: String,
    default: 'rectangle'
  },
  backgroundClass: {
    type: String,
    required: false,
    default: 'bg-cyan-100/95 dark:bg-cyan-500/95'
  }
})

</script>
<template>
  <floating-menu :tippy-options="{
    duration: 100,
    maxWidth: 800,
    placement: 'right',
    appendTo: 'parent'
  }" :editor="editor" :should-show="shouldShowFloatingMenu">
    <ButtonGroup direction="horizontal" type="blue" :shape="shape" :backgroundClass="backgroundClass">
      <Button tips="2号标题" :editor="editor" :level="2" :shape="shape">
        <RiH2></RiH2>
      </Button>
      <Button tips="3号标题" :editor="editor" :level="3" :shape="shape">
        <RiH3></RiH3>
      </Button>
      <Button tips="4号标题" :editor="editor" :level="4" :shape="shape">
        <RiH4></RiH4>
      </Button>
      <Button tips="绘图" :editor="editor" :shape="shape">
        <RiEdit2Line></RiEdit2Line>
      </Button>
      <Button tips="列表" :editor="editor" :shape="shape">
        <RiListCheck></RiListCheck>
      </Button>
      <Button tips="任务列表" :editor="editor" :shape="shape">
        <RiTaskFill></RiTaskFill>
      </Button>
      <Button tips="表格" :editor="editor" :shape="shape">
        <RiTable2></RiTable2>
      </Button>
      <Button tips="代码块" :editor="editor" :shape="shape">
        <RiCodeBlock></RiCodeBlock>
      </Button>
      <Button tips="快捷键" :editor="editor" :shape="shape">
        <RiKeyboardBoxLine></RiKeyboardBoxLine>
      </Button>
      <Button tips="引用" :editor="editor" :shape="shape" @click="editor.chain().focus().toggleBlockquote().run()">
        <RiChatQuoteLine></RiChatQuoteLine>
      </Button>
    </ButtonGroup>
  </floating-menu>
</template>
