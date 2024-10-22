<template>
  <NodeViewWrapper>
    <Panel :deleteNode="props.deleteNode" :readOnly="!props.editor.isEditable" :editor="props.editor" :node="props.node"
      :getPos="props.getPos">
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


const props = defineProps(nodeViewProps)
</script>
