<template>
  <!-- 选中后弹出的菜单 -->
  <div>
    <bubble-menu
      :should-show="shouldShow"
      :tippy-options="{
        duration: 100,
        maxWidth: 800,
        placement: 'top',
        appendTo: 'parent'
      }"
      :editor="editor"
    >
      <ButtonBar>
        <Heading :editor="editor" :level="2" />
        <Heading :editor="editor" :level="3" />
        <Heading :editor="editor" :level="4" />
        <Heading :editor="editor" :level="5" />
        <Heading :editor="editor" :level="6" />
        <Paragraph :editor="editor"></Paragraph>
        <Bold :editor="editor"></Bold>
        <Italic :editor="editor"></Italic>
        <StrikeVue :editor="editor"></StrikeVue>
        <BulletList :editor="editor"></BulletList>
        <Code :editor="editor"></Code>
        <Link :editor="editor"></Link>
        <Kbd :editor="editor"></Kbd>
      </ButtonBar>
    </bubble-menu>
  </div>
</template>

<script lang="ts" setup>
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { Editor, BubbleMenu } from '@tiptap/vue-3'
import { Editor as TiptapEditor } from '@tiptap/core'
import Bold from './operators/Bold.vue'
import Heading from './operators/Heading.vue'
import Italic from './operators/Italic.vue'
import Paragraph from './operators/Paragraph.vue'
import StrikeVue from './operators/Strike.vue'
import BulletList from './operators/BulletList.vue'
import Code from './operators/Code.vue'
import Link from './operators/Link.vue'
import ButtonBar from './../ui/ButtonBar.vue'
import Kbd from './operators/Kbd.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const shouldShow = function (props: {
  editor: TiptapEditor
  view: EditorView
  state: EditorState
  oldState?: EditorState | undefined
  from: number
  to: number
}) {
  const { selection } = props.state
  const { empty } = selection
  const excludes = ['toc', 'image', 'draw', 'link', 'tableCell', 'tableRow', 'tableHeader']

  excludes.forEach((exclude) => {
    if (props.editor.isActive(exclude)) {
      return false
    }
  })

  if (props.editor.isActive('heading', { level: 1 })) {
    return false
  }

  if (!selection.visible) {
    return false
  }

  return !empty
}
</script>
