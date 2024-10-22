<template>
  <NodeViewWrapper contenteditable="true">
    <NodeViewContent class="flex flex-row bg-red-100" />
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { computed } from 'vue'
import Divider from './Divider.vue'
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
