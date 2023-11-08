<template>
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
      正文
    </button>
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      加粗
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      斜体
    </button>
    <button
      @click="editor.chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
    >
      删除线
    </button>
    <button
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      无序列表
    </button>
    <button @click="setHardBreak">换行</button>
  </bubble-menu>
</template>

<script lang="ts" setup>
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { Editor, BubbleMenu, isTextSelection } from '@tiptap/vue-3'

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const shouldShow = function (props: {
  editor: import('@tiptap/core').Editor
  view: import('prosemirror-view').EditorView
  state: import('prosemirror-state').EditorState
  oldState?: import('prosemirror-state').EditorState | undefined
  from: number
  to: number
}) {
  const { selection } = props.state
  const { empty } = selection
  const excludes = ['toc', 'image', 'draw']

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
</script>

<style scoped lang="postcss">
.bubble-menu {
  @apply bg-accent/90 rounded-md px-2 py-1 flex items-center;
  button {
    @apply btn btn-xs btn-ghost;
  }
}
</style>
