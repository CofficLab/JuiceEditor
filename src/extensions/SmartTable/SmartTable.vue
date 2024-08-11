<template>
  <NodeViewWrapper contenteditable="true">
    <Panel
      :deleteNode="props.deleteNode"
      :readOnly="!isEditable"
      :editor="props.editor"
      :node="props.node"
      :getPos="props.getPos"
    >
      <template v-slot:content>
        <NodeViewContent as="div" v-bind:contenteditable="isEditable" />
      </template>

      <template v-slot:operators>
        <Button @click="focusedNode.addColumnBefore().run()" data-tip="在左边加一列">
          <RowPlusBefore></RowPlusBefore>
        </Button>
        <Button @click="focusedNode.addColumnAfter().run()" data-tip="在右边加一列">
          <RowPlusAfter></RowPlusAfter>
        </Button>
        <Button @click="focusedNode.deleteColumn().run()" data-tip="删除当前列">
          <ColumnRemove></ColumnRemove>
        </Button>
        <Divider></Divider>
        <Button @click="focusedNode.addRowBefore().run()" data-tip="在上面加一行">
          <RowPlusBefore></RowPlusBefore>
        </Button>
        <Button @click="focusedNode.addRowAfter().run()" data-tip="在下面加一行">
          <RowPlusAfter></RowPlusAfter>
        </Button>
        <Button @click="focusedNode.deleteRow().run()" data-tip="删除当前行">
          <RowRemove></RowRemove>
        </Button>
        <Divider></Divider>
        <Button @click="focusedNode.mergeCells().run()" data-tip="合并">
          <CellMerge></CellMerge>
        </Button>
        <Button @click="focusedNode.splitCell().run()" data-tip="拆分">
          <CellSplit></CellSplit>
        </Button>
        <Divider></Divider>
        <Button @click="focusedNode.toggleHeaderColumn().run()" data-tip="切换表头列">
          <LeadingHeader></LeadingHeader>
        </Button>
        <Button @click="focusedNode.toggleHeaderRow().run()" data-tip="切换表头行">
          <TopHeader></TopHeader>
        </Button>
        <Button @click="focusedNode.toggleHeaderCell().run()" data-tip="切换普通和表头">
          <TableToggleHeader></TableToggleHeader>
        </Button>
        <Divider></Divider>
        <!-- <button
          @click="focusedNode.deleteTable().run()"
          data-tip="删除整个表格"
        >
          <Remove></Remove>
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
import TableToggleHeader from '../../ui/icons/ToggleHeader.vue'
import RowRemove from '../../ui/icons/RowRemove.vue'
import CellMerge from '../../ui/icons/CellMerge.vue'
import CellSplit from '../../ui/icons/CellSplit.vue'
import RowPlusBefore from '../../ui/icons/RowPlusBefore.vue'
import RowPlusAfter from '../../ui/icons/RowPlusAfter.vue'
import ColumnRemove from '../../ui/icons/ColumnRemove.vue'
import TopHeader from '../../ui/icons/TopHeader.vue'
import LeadingHeader from '../../ui/icons/LeadingHeader.vue'
import Button from '../../ui/Button.vue'

const props = defineProps(nodeViewProps)
const focusedNode = computed(() => props.editor.chain().focus())
const isEditable = computed(() => props.editor.isEditable)
</script>
