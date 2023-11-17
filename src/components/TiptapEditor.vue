<template>
  <div v-if="editor" class="flex">
    <!-- 选中文字后弹出的菜单 -->
    <BubbleMenus :editor="editor" v-if="editable"></BubbleMenus>

    <!-- 回车后弹出的菜单 -->
    <FloatMenus :editor="editor" v-if="editable"></FloatMenus>

    <div class="container mx-auto px-4 md:px-0 flex flex-col pb-48 prose dark:prose-invert">
      <div
        class="flex flex-row bg-blue-300 rounded justify-center text-sm py-1"
        v-if="isDebug && !editable"
      >
        <IconInfo></IconInfo>
        <div class="flex items-center ml-2">
          <p>只读模式</p>
        </div>
      </div>
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import { onBeforeUnmount, onMounted, watch } from 'vue'
import BubbleMenus from './BubbleMenus.vue'
import FloatMenus from './FloatMenus.vue'
import IconInfo from '../icons/IconInfo.vue'
import TiptapAgent from '../entities/TiptapAgent'
import DrawAgent from '../entities/DrawAgent'

let isDebug = process.env.NODE_ENV === 'development'

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
    default: (editor: Editor) => {}
  }
})

var editor = TiptapAgent.create({
  content: props.content,
  editable: props.editable,
  drawIoLink: DrawAgent.getLink(),
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
</style>
