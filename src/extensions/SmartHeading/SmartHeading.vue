<template>
  <NodeViewWrapper class="inline">
    <Panel
      :inline="false"
      :deleteNode="props.deleteNode"
      :readOnly="!props.editor.isEditable"
      :editor="props.editor"
      :node="props.node"
      :getPos="props.getPos"
    >
      <template v-slot:content>
        <hx contenteditable="true" :id="id">
          <NodeViewContent></NodeViewContent>
        </hx>
      </template>
    </Panel>
  </NodeViewWrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { computed } from 'vue'
import Panel from '../Panel.vue'

const props = defineProps(nodeViewProps)
const hx = computed(() => {
  return `h${props.node.attrs.level}`
})
const id = computed(() => props.node.attrs.id)
</script>
