<template>
  <NodeViewWrapper class="inline">
    <Panel :inline="false" :deleteNode="props.deleteNode" :readOnly="!props.editor.isEditable">
      <template v-slot:content>
        <hx>{{ props.node.textContent }}</hx>
      </template>
    </Panel>
  </NodeViewWrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed } from 'vue'
import Panel from '../Panel.vue'

const props = defineProps(nodeViewProps)
const hx = computed(() => {
  return `h${props.node.attrs.level}`
})
</script>
