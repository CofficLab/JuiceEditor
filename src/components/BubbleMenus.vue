<template>
  <!-- 选中后弹出的菜单 -->
  <bubble-menu
    class="bubble-menu"
    :should-show="shouldShow"
    :tippy-options="{ duration: 100, maxWidth: 800 }"
    :editor="editor"
  >
    <button
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
    >
      H2
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
    >
      H3
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
    >
      H4
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
    >
      H5
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
    >
      H6
    </button>
    <button
      @click="editor.chain().focus().setParagraph().run()"
      :class="{ 'is-active': editor.isActive('paragraph', { level: 3 }) }"
    >
      <img src="../icons/character.svg" alt="" class="m-0" />
    </button>
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      <img src="../icons/bold.svg" class="m-0" />
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      <img src="../icons/italic.svg" class="m-0" />
    </button>
    <button
      @click="editor.chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
    >
      <img src="../icons/strikethrough.svg" class="m-0" />
    </button>
    <button
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      <img src="../icons/list.bullet.svg" class="m-0" />
    </button>
    <button @click="setHardBreak">
      <img src="../icons/return.svg" class="m-0" />
    </button>

    <button
      v-if="!editor.isActive('link')"
      @click="setLink"
      :class="{ 'btn-disabled': editor.isActive('link') }"
    >
      <img src="../icons/link.svg" class="m-0" />
    </button>
    <button
      @click="editor.chain().focus().toggleTaskList().run()"
      :class="{ 'is-active': editor.isActive('taskList') }"
    >
      <img src="../icons/checklist.svg" alt="" class="m-0" />
    </button>
    <!-- <button @click="editor.chain().focus().splitListItem('taskItem').run()"
      :disabled="!editor.can().splitListItem('taskItem')">
      拆分
    </button> -->
    <button
      @click="editor.chain().focus().sinkListItem('taskItem').run()"
      :disabled="!editor.can().sinkListItem('taskItem')"
    >
      <img src="../icons/increase.indent.svg" alt="" class="m-0" />
    </button>
    <button
      @click="editor.chain().focus().liftListItem('taskItem').run()"
      :disabled="!editor.can().liftListItem('taskItem')"
    >
      <img src="../icons/decrease.indent.svg" alt="" class="m-0" />
    </button>
    <button
      @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
    >
      <img src="../icons/quote.opening.svg" alt="" class="m-0" />
    </button>
    <button
      @click="editor.chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('code') }"
    >
      <icon-code></icon-code>
    </button>
  </bubble-menu>
</template>

<script lang="ts" setup>
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { Editor, BubbleMenu, isTextSelection } from '@tiptap/vue-3'
import { Editor as TiptapEditor } from '@tiptap/core'
import IconCode from '../icons/IconCode.vue'

const props = defineProps({
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
  const excludes = ['toc', 'image', 'draw', 'table', 'link', 'tableCell', 'tableRow', 'tableHeader']

  excludes.forEach((exclude) => {
    if (props.editor.isActive(exclude)) {
      return false
    }
  })

  if (!selection.visible) {
    return false
  }

  return !empty
}

let setHardBreak = function () {
  props.editor.chain().focus().setHardBreak().run()
}

const setLink = () => {
  const nodes = props.editor.state.selection.content().content
  let text = ''
  nodes.forEach((node) => {
    text += node.textContent
  })

  props.editor
    .chain()
    .deleteSelection()
    .insertContent('<a href="' + text + '">' + text + '</a>')
    .run()
}
</script>

<style scoped lang="postcss">
.bubble-menu {
  @apply bg-gray-400/95 text-accent-content rounded-md px-2 py-1 gap-1 flex items-center flex-wrap;

  button {
    @apply btn btn-sm btn-ghost px-1 w-10;
  }

  button:disabled {
    @apply bg-gray-700/40;
  }
}
</style>
