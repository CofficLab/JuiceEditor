<template>
  <NodeViewWrapper class="bg-green-800 p-4">
    <div>
      <h3>Group Pre</h3>
      <NodeViewContent></NodeViewContent>
    </div>
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

defineProps(nodeViewProps)
</script>
