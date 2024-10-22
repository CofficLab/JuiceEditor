<template>
  <NodeViewWrapper contenteditable="true" class="w-full">
    <NodeViewContent class="w-full bg-red-100" />
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { computed } from 'vue'

const props = defineProps(nodeViewProps)
const focusedNode = computed(() => props.editor.chain().focus())
const isEditable = computed(() => props.editor.isEditable)
</script>
