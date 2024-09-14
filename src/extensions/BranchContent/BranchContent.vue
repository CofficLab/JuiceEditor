<template>
  <NodeViewWrapper class="branch">
    <NodeViewContent v-show="shouldRender" />
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { computed, } from 'vue'
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'

const props = defineProps(nodeViewProps)

const shouldRender = computed(() => {
  const nodePos = props.editor.state.doc.resolve(props.getPos())
  const parentNode = nodePos.parent

  if (parentNode == null) {
    return true
  }

  return props.node.attrs.version === parentNode.attrs.currentVersion
})
</script>
