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
          <NodeViewContent :key="id"></NodeViewContent>
        </hx>
      </template>
    </Panel>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import Panel from '../Panel.vue'
import { computed, watch } from 'vue'

const props = defineProps(nodeViewProps)
const hx = 'h' + props.node.attrs.level
const id = computed(() => props.node.attrs.id)
</script>
