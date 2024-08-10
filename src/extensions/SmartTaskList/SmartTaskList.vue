<template>
  <NodeViewWrapper>
    <Panel :deleteNode="props.deleteNode" :readOnly="!props.editor.isEditable">
      <template v-slot:content>
        <ul data-type="taskList">
          <NodeViewContent></NodeViewContent>
        </ul>
      </template>
    </Panel>
  </NodeViewWrapper>
</template>
<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Panel from '../Panel.vue'

const props = defineProps(nodeViewProps)

console.log(props.node)
</script>
