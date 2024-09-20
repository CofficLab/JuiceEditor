<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Divider from '../ui/Divider.vue'
import TableToggleHeader from '../ui/icons/ToggleHeader.vue'
import RowRemove from '../ui/icons/RowRemove.vue'
import CellMerge from '../ui/icons/CellMerge.vue'
import CellSplit from '../ui/icons/CellSplit.vue'
import RowPlusBefore from '../ui/icons/RowPlusBefore.vue'
import RowPlusAfter from '../ui/icons/RowPlusAfter.vue'
import ColumnRemove from '../ui/icons/ColumnRemove.vue'
import TopHeader from '../ui/icons/TopHeader.vue'
import LeadingHeader from '../ui/icons/LeadingHeader.vue'
import Button from '../ui/Button.vue'

let props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})

const focusedNode = computed(() => props.editor.chain().focus())
const isEditable = computed(() => props.editor.isEditable)

</script>

<template>
    <Button @click="focusedNode.addColumnBefore().run()" tip="在左边加一列">
        <RowPlusBefore></RowPlusBefore>
    </Button>
    <Button @click="focusedNode.addColumnAfter().run()" tip="在右边加一列">
        <RowPlusAfter></RowPlusAfter>
    </Button>
    <Button @click="focusedNode.deleteColumn().run()" tip="删除当前列">
        <ColumnRemove></ColumnRemove>
    </Button>
    <Divider></Divider>
    <Button @click="focusedNode.addRowBefore().run()" tip="在上面加一行">
        <RowPlusBefore></RowPlusBefore>
    </Button>
    <Button @click="focusedNode.addRowAfter().run()" tip="在下面加一行">
        <RowPlusAfter></RowPlusAfter>
    </Button>
    <Button @click="focusedNode.deleteRow().run()" tip="删除当前行">
        <RowRemove></RowRemove>
    </Button>
    <Divider></Divider>
    <Button @click="focusedNode.mergeCells().run()" tip="合并">
        <CellMerge></CellMerge>
    </Button>
    <Button @click="focusedNode.splitCell().run()" tip="拆分">
        <CellSplit></CellSplit>
    </Button>
    <Divider></Divider>
    <Button @click="focusedNode.toggleHeaderColumn().run()" tip="切换表头列">
        <LeadingHeader></LeadingHeader>
    </Button>
    <Button @click="focusedNode.toggleHeaderRow().run()" tip="切换表头行">
        <TopHeader></TopHeader>
    </Button>
    <Button @click="focusedNode.toggleHeaderCell().run()" tip="切换普通和表头">
        <TableToggleHeader></TableToggleHeader>
    </Button>
    <Divider></Divider>
    <!-- <button
          @click="focusedNode.deleteTable().run()"
          tip="删除整个表格"
        >
          <Remove></Remove>
        </button> -->
    <!-- <button @click="focusedNode.setCellAttribute('colspan', 2).run()">占两格</button> -->
    <!-- <button @click="focusedNode.fixTables().run()">修复</button> -->
    <!-- <button @click="focusedNode.goToNextCell().run()">下一格</button> -->
    <!-- <button @click="focusedNode.goToPreviousCell().run()">上一格</button> -->
</template>