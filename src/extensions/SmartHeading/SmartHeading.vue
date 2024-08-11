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
        <h1 :contenteditable="props.editor.isEditable" :id="id" v-if="props.node.attrs.level === 1">
          <NodeViewContent></NodeViewContent>
        </h1>

        <h2 :contenteditable="props.editor.isEditable" :id="id" v-if="props.node.attrs.level === 2">
          <NodeViewContent></NodeViewContent>
        </h2>

        <h3 :contenteditable="props.editor.isEditable" :id="id" v-if="props.node.attrs.level === 3">
          <NodeViewContent></NodeViewContent>
        </h3>

        <h4 :contenteditable="props.editor.isEditable" :id="id" v-if="props.node.attrs.level === 4">
          <NodeViewContent></NodeViewContent>
        </h4>

        <h5 :contenteditable="props.editor.isEditable" :id="id" v-if="props.node.attrs.level === 5">
          <NodeViewContent></NodeViewContent>
        </h5>

        <h6 :contenteditable="props.editor.isEditable" :id="id" v-if="props.node.attrs.level === 6">
          <NodeViewContent></NodeViewContent>
        </h6>
      </template>
    </Panel>

    <NodeViewContent></NodeViewContent>
  </NodeViewWrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { computed, watch } from 'vue'
import Panel from '../Panel.vue'

const props = defineProps(nodeViewProps)
var hx = `h${props.node.attrs.level}`
const id = computed(() => props.node.attrs.id)

console.log(props.node)

watch(props, () => {
  console.log('props变了', props.node)
  hx = `h${props.node.attrs.level}`
  console.log(hx)
})
</script>
