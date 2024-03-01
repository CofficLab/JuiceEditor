<template>
  <node-view-wrapper contenteditable="true">
    <Panel>
      <template v-slot:content>
        <NodeViewContent as="div" v-bind:contenteditable="isEditable" />
      </template>

      <template v-slot:operators>
        <div class="table-menus flex flex-wrap join" contenteditable="false">
          <button
            @click="focusedNode.addColumnBefore().run()"
            class="tooltip"
            data-tip="在左边加一列"
          >
            <RowPlusBefore></RowPlusBefore>
          </button>
          <button
            @click="focusedNode.addColumnAfter().run()"
            class="tooltip"
            data-tip="在右边加一列"
          >
            <RowPlusAfter></RowPlusAfter>
          </button>
          <button @click="focusedNode.deleteColumn().run()" class="tooltip" data-tip="删除当前列">
            <ColumnRemove></ColumnRemove>
          </button>
          <Divider></Divider>
          <button @click="focusedNode.addRowBefore().run()" class="tooltip" data-tip="在上面加一行">
            <RowPlusBefore></RowPlusBefore>
          </button>
          <button @click="focusedNode.addRowAfter().run()" class="tooltip" data-tip="在下面加一行">
            <RowPlusAfter></RowPlusAfter>
          </button>
          <button @click="focusedNode.deleteRow().run()" class="tooltip" data-tip="删除当前行">
            <RowRemove></RowRemove>
          </button>
          <Divider></Divider>
          <button @click="focusedNode.mergeCells().run()" class="tooltip" data-tip="合并">
            <CellMerge></CellMerge>
          </button>
          <button @click="focusedNode.splitCell().run()" class="tooltip" data-tip="拆分">
            <CellSplit></CellSplit>
          </button>
          <Divider></Divider>
          <button
            @click="focusedNode.toggleHeaderColumn().run()"
            class="tooltip"
            data-tip="切换表头列"
          >
            <LeadingHeader></LeadingHeader>
          </button>
          <button
            @click="focusedNode.toggleHeaderRow().run()"
            class="tooltip"
            data-tip="切换表头行"
          >
            <TopHeader></TopHeader>
          </button>
          <button
            @click="focusedNode.toggleHeaderCell().run()"
            class="tooltip"
            data-tip="切换普通和表头"
          >
            <TableToggleHeader></TableToggleHeader>
          </button>
          <Divider></Divider>
          <button @click="focusedNode.deleteTable().run()" class="tooltip" data-tip="删除整个表格">
            <Remove></Remove>
          </button>
          <!-- <button @click="focusedNode.setCellAttribute('colspan', 2).run()">占两格</button> -->
          <!-- <button @click="focusedNode.fixTables().run()">修复</button> -->
          <!-- <button @click="focusedNode.goToNextCell().run()">下一格</button> -->
          <!-- <button @click="focusedNode.goToPreviousCell().run()">上一格</button> -->
        </div>
      </template>
    </Panel>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { computed } from 'vue'
import Divider from './Divider.vue'
import Panel from '../Panel.vue'
import TableToggleHeader from './Icons/ToggleHeader.vue'
import RowRemove from './Icons/RowRemove.vue'
import CellMerge from './Icons/CellMerge.vue'
import Remove from './Icons/Remove.vue'
import CellSplit from './Icons/CellSplit.vue'
import RowPlusBefore from './Icons/RowPlusBefore.vue'
import RowPlusAfter from './Icons/RowPlusAfter.vue'
import ColumnRemove from './Icons/ColumnRemove.vue'
import TopHeader from './Icons/TopHeader.vue'
import LeadingHeader from './Icons/LeadingHeader.vue'

const props = defineProps(nodeViewProps)
const focusedNode = computed(() => props.editor.chain().focus())
const isEditable = computed(() => props.editor.isEditable)
</script>

<style lang="postcss">
.table-menus {
  button {
    @apply btn btn-sm join-item rounded-none px-2 py-0 flex justify-center items-center;

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
  padding: 0rem 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>
