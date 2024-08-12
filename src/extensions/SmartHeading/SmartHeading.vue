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
        <hx :contenteditable="props.editor.isEditable" :id="id">
          <NodeViewContent></NodeViewContent>
        </hx>
      </template>
    </Panel>

    <NodeViewContent></NodeViewContent>
  </NodeViewWrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import Panel from '../Panel.vue'
import { computed } from 'vue'

const props = defineProps(nodeViewProps)
var hx = props.node.type.name
const id = computed(() => props.node.attrs.id)
</script>
