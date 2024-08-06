<template>
  <NodeViewWrapper contenteditable="true">
    <Panel :deleteNode="props.deleteNode">
      <template v-slot:content>
        <NodeViewContent as="div" v-bind:contenteditable="isEditable" />
      </template>

      <template v-slot:operators>
        <button
          @click="focusedNode.addColumnBefore().run()"
          class="tooltip btn btn-sm join-item"
          data-tip="在左边加一列"
        >
          <RowPlusBefore class="h-5 w-5"></RowPlusBefore>
        </button>
        <button
          @click="focusedNode.addColumnAfter().run()"
          class="tooltip btn btn-sm join-item"
          data-tip="在右边加一列"
        >
          <RowPlusAfter class="h-5 w-5"></RowPlusAfter>
        </button>
        <button
          @click="focusedNode.deleteColumn().run()"
          class="tooltip btn btn-sm join-item"
          data-tip="删除当前列"
        >
          <ColumnRemove class="h-5 w-5"></ColumnRemove>
        </button>
        <Divider></Divider>
        <button
          @click="focusedNode.addRowBefore().run()"
          class="tooltip btn btn-sm join-item"
          data-tip="在上面加一行"
        >
          <RowPlusBefore class="h-5 w-5"></RowPlusBefore>
        </button>
        <button
          @click="focusedNode.addRowAfter().run()"
          class="tooltip btn btn-sm join-item"
          data-tip="在下面加一行"
        >
          <RowPlusAfter class="h-5 w-5"></RowPlusAfter>
        </button>
        <button
          @click="focusedNode.deleteRow().run()"
          class="tooltip btn btn-sm join-item"
          data-tip="删除当前行"
        >
          <RowRemove class="h-5 w-5"></RowRemove>
        </button>
        <Divider></Divider>
        <button
          @click="focusedNode.mergeCells().run()"
          class="tooltip btn btn-sm join-item"
          data-tip="合并"
        >
          <CellMerge class="h-5 w-5"></CellMerge>
        </button>
        <button
          @click="focusedNode.splitCell().run()"
          class="tooltip btn btn-sm join-item"
          data-tip="拆分"
        >
          <CellSplit class="h-5 w-5"></CellSplit>
        </button>
        <Divider></Divider>
        <button
          @click="focusedNode.toggleHeaderColumn().run()"
          class="tooltip btn btn-sm join-item"
          data-tip="切换表头列"
        >
          <LeadingHeader class="h-5 w-5"></LeadingHeader>
        </button>
        <button
          @click="focusedNode.toggleHeaderRow().run()"
          class="tooltip btn btn-sm join-item"
          data-tip="切换表头行"
        >
          <TopHeader class="h-5 w-5"></TopHeader>
        </button>
        <button
          @click="focusedNode.toggleHeaderCell().run()"
          class="tooltip btn btn-sm join-item"
          data-tip="切换普通和表头"
        >
          <TableToggleHeader class="h-5 w-5"></TableToggleHeader>
        </button>
        <Divider></Divider>
        <!-- <button
          @click="focusedNode.deleteTable().run()"
          class="tooltip btn btn-sm join-item"
          data-tip="删除整个表格"
        >
          <Remove class="h-5 w-5"></Remove>
        </button> -->
        <!-- <button @click="focusedNode.setCellAttribute('colspan', 2).run()">占两格</button> -->
        <!-- <button @click="focusedNode.fixTables().run()">修复</button> -->
        <!-- <button @click="focusedNode.goToNextCell().run()">下一格</button> -->
        <!-- <button @click="focusedNode.goToPreviousCell().run()">上一格</button> -->
      </template>
    </Panel>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { computed } from 'vue'
import Divider from './Divider.vue'
import Panel from '../Panel.vue'
import TableToggleHeader from './Icons/ToggleHeader.vue'
import RowRemove from './Icons/RowRemove.vue'
import CellMerge from './Icons/CellMerge.vue'
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
