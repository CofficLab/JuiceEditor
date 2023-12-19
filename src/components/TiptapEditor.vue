<template>
  <div v-if="editor" class="flex flex-col tiptap">
    <!-- 选中文字后弹出的菜单 -->
    <BubbleMenus
      :editor="editor"
      v-if="editable && bubbleMenusEnable && !contextMenuDidShow"
    ></BubbleMenus>

    <!-- 回车后弹出的菜单 -->
    <FloatMenus
      :editor="editor"
      v-if="editable && floatingMenusEnable && !contextMenuDidShow"
    ></FloatMenus>

    <!-- 编辑器 -->
    <editor-content
      :editor="editor"
      class="container mx-auto px-4 md:px-0 flex flex-col pb-48 prose prose-sm lg:prose-lg dark:prose-invert"
    />

    <!-- 右键菜单 -->
    <ContextMenu :editor="editor"></ContextMenu>
  </div>
</template>

<script lang="ts" setup>
import { EditorContent } from '@tiptap/vue-3'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BubbleMenus from './BubbleMenus.vue'
import FloatMenus from './FloatMenus.vue'
import TiptapAgent from '../entities/TiptapAgent'
import DrawAgent from '../entities/DrawAgent'
import EditorData from '../entities/EditorData'
import ContextMenu from './ContextMenu.vue'
import EditorEventHandler from '../entities/EditorEventHandler'

const props = defineProps({
  uuid: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  editable: {
    type: Boolean,
    default: false
  },
  drawEnable: {
    required: true,
    type: Boolean,
    default: false
  },
  tableEnable: {
    type: Boolean,
    default: false,
    required: true
  },
  bubbleMenusEnable: {
    type: Boolean,
    default: true,
    required: true
  },
  floatingMenusEnable: {
    type: Boolean,
    default: true,
    required: true
  },
  onUpdate: {
    type: Function,
    default: () => {}
  },
  onSelectionUpdate: {
    type: Function,
    default: () => {}
  }
})

const editor = TiptapAgent.create({
  uuid: props.uuid,
  content: props.content,
  editable: props.editable,
  drawIoLink: DrawAgent.getLink(),
  drawEnable: props.drawEnable,
  tableEnable: props.tableEnable,
  onUpdate: (data: EditorData) => {
    props.onUpdate(data)
  },
  onSelectionUpdate(type) {
    console.log('TiptapEditor: onSelectionUpdate', type)
    props.onSelectionUpdate(type)
  }
})

const contextMenuDidShow = ref(false)
const contextMenuDidHide = ref(false)

document.addEventListener('contextmenu', () => {
  contextMenuDidShow.value = true
})

document.addEventListener('click', () => {
  contextMenuDidHide.value = true
  contextMenuDidShow.value = false
})

watch(props, () => {
  console.log('TiptapEditor: props changed')

  editor.setEditable(props.editable)
  editor.commands.setContent(props.content, false)
  editor.setOptions({
    injectNonce: props.uuid
  })
})

onMounted(() => {
  new EditorEventHandler(editor)
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
