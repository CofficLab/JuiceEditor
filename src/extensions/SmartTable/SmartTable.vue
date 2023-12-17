<template>
  <node-view-wrapper>
    <!-- 表格的操作 -->
    <template v-if="shouldShow">
      <div class="dropdown dropdown-top dropdown-open flex">
        <div class="table-menus shadow-2xl" contenteditable="false">
          <button
            @click="focusedNode.addColumnBefore().run()"
            class="tooltip"
            data-tip="在左边加一列"
          >
            <img src="../../assets/table.column.plus.before.svg" />
          </button>
          <button
            @click="focusedNode.addColumnAfter().run()"
            class="tooltip"
            data-tip="在右边加一列"
          >
            <img src="../../assets/table.column.plus.after.svg" />
          </button>
          <button @click="focusedNode.deleteColumn().run()" class="tooltip" data-tip="删除当前列">
            <img src="../../assets/table.column.remove.svg" />
          </button>
          <button @click="focusedNode.addRowBefore().run()" class="tooltip" data-tip="在上面加一行">
            <img src="../../assets/table.row.plus.before.svg" />
          </button>
          <button @click="focusedNode.addRowAfter().run()" class="tooltip" data-tip="在下面加一行">
            <img src="../../assets/table.row.plus.after.svg" />
          </button>
          <button @click="focusedNode.deleteRow().run()" class="tooltip" data-tip="删除当前行">
            <img src="../../assets/table.row.remove.svg" />
          </button>
          <button @click="focusedNode.deleteTable().run()" class="tooltip" data-tip="删除整个表格">
            <img src="../../assets/table.remove.svg" />
          </button>
          <button @click="focusedNode.mergeCells().run()" class="tooltip" data-tip="合并">
            <img src="../../assets/table.cell.merge.svg" />
          </button>
          <button @click="focusedNode.splitCell().run()" class="tooltip" data-tip="拆分">
            <img src="../../assets/table.cell.split.svg" />
          </button>
          <button
            @click="focusedNode.toggleHeaderColumn().run()"
            class="tooltip"
            data-tip="切换表头列"
          >
            <img src="../../assets/table.leading.header.svg" alt="" />
          </button>
          <button
            @click="focusedNode.toggleHeaderRow().run()"
            class="tooltip"
            data-tip="切换表头行"
          >
            <img src="../../assets/table-top-header.svg" alt="" />
          </button>
          <button
            @click="focusedNode.toggleHeaderCell().run()"
            class="tooltip"
            data-tip="切换普通和表头"
          >
            <img src="../../assets/table.toggle.header.svg" alt="" />
          </button>
          <!-- <button @click="focusedNode.setCellAttribute('colspan', 2).run()">占两格</button> -->
          <!-- <button @click="focusedNode.fixTables().run()">修复</button> -->
          <!-- <button @click="focusedNode.goToNextCell().run()">下一格</button> -->
          <!-- <button @click="focusedNode.goToPreviousCell().run()">上一格</button> -->
        </div>
      </div>
    </template>

    <!-- 表格 -->
    <NodeViewContent as="div" />
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { computed, onMounted, ref } from 'vue'

const props = defineProps(nodeViewProps)
const focusedNode = computed(() => props.editor.chain().focus())
const shouldShow = ref(false)
// 是否是整个editor.state.doc.content的最后一个node
let isTheLastNode = computed(
  () => props.node.nodeSize + props.getPos() == props.editor.state.doc.content.size
)

document.addEventListener('click', function () {
  // console.log('clicked', props.getPos(), props.node.nodeSize, props.editor.state.selection.anchor)

  if (!props.editor.isEditable) {
    return
  }

  // 如果鼠标在 Table 内，显示菜单

  const currentPos = props.editor.state.selection.anchor
  const start = props.getPos()
  const end = props.getPos() + props.node.nodeSize
  shouldShow.value = currentPos >= start && currentPos <= end
})

onMounted(() => {
  // 如果是最后一个节点，在本节点后插入一个空的p，防止光标无法移动到下一个节点
  if (isTheLastNode.value) {
    let tail = props.editor.state.doc.content.size
    console.log('SmartTable: 结尾插入p，防止光标无法移动')
    props.editor.commands.insertContentAt(tail, '<p></p>', {
      updateSelection: false,
      parseOptions: {
        preserveWhitespace: 'full'
      }
    })
  }
})
</script>

<style lang="postcss">
.table-menus {
  @apply bg-success/90 text-info-content rounded-md px-2 py-1 flex flex-row flex-wrap dropdown-content;

  button {
    @apply btn btn-sm btn-ghost px-1;

    img {
      @apply w-6 h-6 m-0;
    }
  }
}

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

    th {
      @apply dark:bg-green-800/20 dark:border-blue-800;
    }

    td {
      @apply dark:border-blue-900;
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
