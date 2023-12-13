<template>
  <div v-if="editor" class="flex flex-col tiptap">
    <!-- 选中文字后弹出的菜单 -->
    <BubbleMenus :editor="editor" v-if="editable"></BubbleMenus>

    <!-- 回车后弹出的菜单 -->
    <FloatMenus :editor="editor" v-if="editable"></FloatMenus>

    <!-- 操作栏 -->
    <div v-if="editor">
      <editor-content :editor="editor" />
    </div>

    <div class="container mx-auto px-4 md:px-0 flex flex-col pb-48 prose dark:prose-invert">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EditorContent } from '@tiptap/vue-3'
import { onBeforeUnmount, onMounted, watch } from 'vue'
import BubbleMenus from './BubbleMenus.vue'
import FloatMenus from './FloatMenus.vue'
import TiptapAgent from '../entities/TiptapAgent'
import DrawAgent from '../entities/DrawAgent'
import EditorData from 'src/entities/EditorData'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  editable: {
    type: Boolean,
    default: false
  },
  onUpdate: {
    type: Function,
    default: () => {}
  }
})

var editor = TiptapAgent.create({
  content: props.content,
  editable: props.editable,
  drawIoLink: DrawAgent.getLink(),
  onUpdate: (data: EditorData) => {
    props.onUpdate(data)
  }
})

watch(props, () => {
  console.log('TiptapEditor: props changed')

  if (props.editable != editor.isEditable) {
    editor.setEditable(props.editable)
  }

  if (editor.getHTML() !== props.content) {
    console.log('TiptapEditor: props.content changed, update content')
    editor.commands.setContent(props.content, false)
  }
})

onMounted(() => {
  document.addEventListener('ToggleToc', function (e) {
    editor.chain().focus().toggleToc().run()
  })
})

onBeforeUnmount(() => {
  editor.destroy()
})
</script>

<style lang="scss">
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }
}

/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
}

/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}

/* Placeholder (on every new line) */
.ProseMirror .is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}

ul[data-type='taskList'] {
  list-style: none;
  padding: 0;

  p {
    margin: 0;
  }

  li {
    display: flex;

    > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    > div {
      flex: 1 1 auto;
    }

    ul li,
    ol li {
      display: list-item;
    }

    ul[data-type='taskList'] > li {
      display: flex;
    }
  }
}
</style>

<style lang="scss">
.tiptap {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>

<style lang="postcss" scoped>
button {
  @apply btn btn-primary btn-xs;
}
</style>
