<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Divider from '../ui/Divider.vue'
import Button from '../ui/Button.vue'
import { RiInsertColumnLeft, RiInsertColumnRight, RiDeleteColumn, RiInsertRowTop, RiInsertRowBottom, RiDeleteRow, RiMergeCellsHorizontal, RiSplitCellsHorizontal } from '@remixicon/vue'
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
        <RiInsertColumnLeft></RiInsertColumnLeft>
    </Button>
    <Button @click="focusedNode.addColumnAfter().run()" tip="在右边加一列">
        <RiInsertColumnRight></RiInsertColumnRight>
    </Button>
    <Button @click="focusedNode.deleteColumn().run()" tip="删除当前列">
        <RiDeleteColumn></RiDeleteColumn>
    </Button>
    <Divider></Divider>
    <Button @click="focusedNode.addRowBefore().run()" tip="在上面加一行">
        <RiInsertRowTop></RiInsertRowTop>
    </Button>
    <Button @click="focusedNode.addRowAfter().run()" tip="在下面加一行">
        <RiInsertRowBottom></RiInsertRowBottom>
    </Button>
    <Button @click="focusedNode.deleteRow().run()" tip="删除当前行">
        <RiDeleteRow></RiDeleteRow>
    </Button>
    <Divider></Divider>
    <Button @click="focusedNode.mergeCells().run()" tip="合并">
        <RiMergeCellsHorizontal></RiMergeCellsHorizontal>
    </Button>
    <Button @click="focusedNode.splitCell().run()" tip="拆分">
        <RiSplitCellsHorizontal></RiSplitCellsHorizontal>
    </Button>
    <!-- <Button @click="focusedNode.toggleHeaderColumn().run()" tip="切换表头列">
        <RiLeadingHeader></RiLeadingHeader>
    </Button>
    <Button @click="focusedNode.toggleHeaderRow().run()" tip="切换表头行">
        <RiTopHeader></RiTopHeader>
    </Button>
    <Button @click="focusedNode.toggleHeaderCell().run()" tip="切换普通和表头">
        <RiTableToggleHeader></RiTableToggleHeader>
    </Button> -->
    <!-- <button @click="focusedNode.setCellAttribute('colspan', 2).run()">占两格</button> -->
    <!-- <button @click="focusedNode.fixTables().run()">修复</button> -->
    <!-- <button @click="focusedNode.goToNextCell().run()">下一格</button> -->
    <!-- <button @click="focusedNode.goToPreviousCell().run()">上一格</button> -->
</template>