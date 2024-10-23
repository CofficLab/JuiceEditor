<template>
  <NodeViewWrapper class="inline">
    <Panel :inline="false" :deleteNode="props.deleteNode" :readOnly="!props.editor.isEditable" :editor="props.editor"
      :node="props.node" :getPos="props.getPos">
      <template v-slot:content>
        <blockquote :contenteditable="props.editor.isEditable">
          <NodeViewContent></NodeViewContent>
        </blockquote>
      </template>
    </Panel>
  </NodeViewWrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { computed } from 'vue'

const props = defineProps(nodeViewProps)
</script>
