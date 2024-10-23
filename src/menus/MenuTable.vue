<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Button from '../ui/Button.vue'
import {
    RiInsertColumnLeft, RiInsertColumnRight, RiDeleteColumn, RiInsertRowTop,
    RiInsertRowBottom, RiDeleteRow, RiMergeCellsHorizontal, RiSplitCellsHorizontal, RiHeading,
    RiText,
    RiLayoutColumnLine,
    RiLayoutRowLine,
    RiArrowRightSLine,
    RiArrowLeftSLine,
    RiLayoutColumnFill,
    RiLayoutRowFill
} from '@remixicon/vue'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
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
    <Button @click="focusedNode.addColumnBefore().run()" tips="在左边加一列">
        <RiInsertColumnLeft></RiInsertColumnLeft>
    </Button>
    <Button @click="focusedNode.addColumnAfter().run()" tips="在右边加一列">
        <RiInsertColumnRight></RiInsertColumnRight>
    </Button>
    <Button @click="focusedNode.deleteColumn().run()" tips="删除当前列">
        <RiDeleteColumn></RiDeleteColumn>
    </Button>
    <Button @click="focusedNode.addRowBefore().run()" tips="在上面加一行">
        <RiInsertRowTop></RiInsertRowTop>
    </Button>
    <Button @click="focusedNode.addRowAfter().run()" tips="在下面加一行">
        <RiInsertRowBottom></RiInsertRowBottom>
    </Button>
    <Button @click="focusedNode.deleteRow().run()" tips="删除当前行">
        <RiDeleteRow></RiDeleteRow>
    </Button>
    <Button @click="focusedNode.mergeCells().run()" tips="合并">
        <RiMergeCellsHorizontal></RiMergeCellsHorizontal>
    </Button>
    <Button @click="focusedNode.splitCell().run()" tips="拆分">
        <RiSplitCellsHorizontal></RiSplitCellsHorizontal>
    </Button>

    <Button @click="focusedNode.toggleHeaderColumn().run()" tips="设置/取消标题列">
        <RiLayoutColumnFill></RiLayoutColumnFill>
    </Button>

    <Button @click="focusedNode.toggleHeaderRow().run()" tips="设置/取消标题行">
        <RiLayoutRowFill></RiLayoutRowFill>
    </Button>

    <Button @click="focusedNode.goToNextCell().run()" tips="下一格">
        <RiArrowRightSLine></RiArrowRightSLine>
    </Button>
    <Button @click="focusedNode.goToPreviousCell().run()" tips="上一格">
        <RiArrowLeftSLine></RiArrowLeftSLine>
    </Button>



    <!-- <button @click="focusedNode.setCellAttribute('colspan', 2).run()">占两格</button> -->
    <!-- <button @click="focusedNode.fixTables().run()">修复</button> -->
</template>