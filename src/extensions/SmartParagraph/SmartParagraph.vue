<template>
  <NodeViewWrapper class="inline">
    <Panel :inline="false" :deleteNode="props.deleteNode" :readOnly="!props.editor.isEditable">
      <template v-slot:content>
        <p>{{ props.node.textContent }}</p>
      </template>
    </Panel>
  </NodeViewWrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Panel from '../Panel.vue'

const props = defineProps(nodeViewProps)
</script>
