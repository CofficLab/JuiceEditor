<template>
  <div v-if="editor" class="flex flex-col tiptap">
    <!-- 选中文字后弹出的菜单 -->
    <BubbleMenus :editor="editor" v-if="editable"></BubbleMenus>

    <!-- 回车后弹出的菜单 -->
    <FloatMenus :editor="editor" v-if="editable"></FloatMenus>

    <!-- 操作栏 -->
    <div class="operation-bar hidden">
      <!-- 表格的操作 -->
      <!-- <div class="operation-bar-table hidden" v-if="editor.isActive('table')">
        <button v-if="editor.isActive('tableCell')" @click="editor.chain().focus().addColumnBefore().run()">
          <img src="../assets/table.column.plus.before.svg" alt="" class="m-0 w-5 h-5" />
        </button>
        <button v-if="editor.isActive('tableCell')" @click="editor.chain().focus().addColumnAfter().run()">
          <img src="../assets/table.column.plus.after.svg" alt="" class="m-0 w-5 h-5" />
        </button>
        <button v-if="editor.isActive('tableCell')" @click="editor.chain().focus().deleteColumn().run()">
          <img src="../assets/table.column.remove.svg" alt="" class="m-0 w-6 h-6" />
        </button>
        <button v-if="editor.isActive('tableCell')" @click="editor.chain().focus().addRowBefore().run()">
          <img src="../assets/table.row.plus.before.svg" alt="" class="m-0 w-6 h-6" />
        </button>
        <button v-if="editor.isActive('tableCell')" @click="editor.chain().focus().addRowAfter().run()">
          <img src="../assets/table.row.plus.after.svg" alt="" class="m-0 w-6 h-6" />
        </button>
        <button v-if="editor.isActive('tableCell')" @click="editor.chain().focus().deleteRow().run()">
          <img src="../assets/table.row.remove.svg" alt="" class="m-0 w-6 h-6" />
        </button>
        <button v-if="editor.isActive('tableCell')" @click="editor.chain().focus().deleteTable().run()">
          <img src="../assets/table.remove.svg" alt="" class="m-0 w-6 h-6" />
        </button>
        <button v-if="editor.isActive('tableCell')" @click="editor.chain().focus().mergeCells().run()">
          <img src="../assets/table.cell.merge.svg" alt="" class="m-0 w-6 h-6" />
        </button>
        <button v-if="editor.isActive('tableCell')" @click="editor.chain().focus().splitCell().run()">
          <img src="../assets/table.cell.split.svg" alt="" class="w-6 h-6 m-0" />
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().toggleHeaderColumn().run()"
        >
          切换表头列
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().toggleHeaderRow().run()"
        >
          切换表头行
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().toggleHeaderCell().run()"
        >
          切换表头格
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().mergeOrSplit().run()"
        >
          合并或拆分
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().setCellAttribute('colspan', 2).run()"
        >
          占两格
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().fixTables().run()"
        >
          修复
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().goToNextCell().run()"
        >
          下一格
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().goToPreviousCell().run()"
        >
          上一格
        </button>
      </div> -->
    </div>

    <div class="container mx-4 lg:mx-auto px-4 md:px-0 flex flex-col pb-48 prose dark:prose-invert">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EditorContent } from '@tiptap/vue-3'
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import BubbleMenus from './BubbleMenus.vue'
import FloatMenus from './FloatMenus.vue'
import TiptapAgent from '../entities/TiptapAgent'
import DrawAgent from '../entities/DrawAgent'
import EditorData from '../entities/EditorData'
import { Editor } from '@tiptap/vue-3'

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
  onUpdate: {
    type: Function,
    default: () => { }
  }
})

const editor = makeEditor(props)
const isTableActive = computed(() => {
  return editor.isActive('table')
})

function makeEditor(props: any): Editor {
  return TiptapAgent.create({
    uuid: props.uuid,
    content: props.content,
    editable: props.editable,
    drawIoLink: DrawAgent.getLink(),
    drawEnable: props.drawEnable,
    tableEnable: props.tableEnable,
    onUpdate: (data: EditorData) => {
      props.onUpdate(data)
    }
  })
}

watch(props, () => {
  console.log('TiptapEditor: props changed')

  editor.setEditable(props.editable)
  editor.commands.setContent(props.content, false)
  editor.setOptions({
    injectNonce: props.uuid
  })
})

watch(isTableActive, (newValue, oldValue) => {
  console.log('TiptapEditor: isTableActive changed')

  if (newValue) {
    let tableOperationsDom = document.getElementsByClassName("operations").item(0)
    if (tableOperationsDom) {
      tableOperationsDom.innerHTML = "xxxxx"
    }
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

document.addEventListener('add-row', (event) => {
  console.log(event)
  editor.chain().focus().addColumnBefore().run()
})
</script>

<style lang="scss">
.ProseMirror {
  >*+* {
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
  >*+* {
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

    >label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    >div {
      flex: 1 1 auto;
    }

    ul li,
    ol li {
      display: list-item;
    }

    ul[data-type='taskList']>li {
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

      >* {
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
.operation-bar {
  @apply container mx-auto flex justify-center bg-transparent;

  .operation-bar-table {
    @apply bg-info/95 text-info-content max-w-xl flex flex-wrap justify-center flex-row gap-4 rounded-md px-2 py-1
  }

  button {
    @apply btn btn-sm btn-ghost px-1;
  }
}

button {
  @apply btn btn-primary btn-xs;
}
</style>
