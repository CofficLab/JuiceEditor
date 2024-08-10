<template>
  <NodeViewWrapper class="inline">
    <Panel
      v-if="showPanel"
      :inline="false"
      :deleteNode="props.deleteNode"
      :readOnly="!props.editor.isEditable"
      :editor="props.editor"
      :node="props.node"
      :getPos="props.getPos"
    >
      <template v-slot:content>
        <p contenteditable="true">{{ props.node.textContent }}</p>
      </template>
    </Panel>

    <p v-else>{{ props.node.textContent }}</p>
  </NodeViewWrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Panel from '../Panel.vue'

const props = defineProps(nodeViewProps)
const showPanel = shouldShowPanel()

function shouldShowPanel() {
  let doc = props.editor.state.doc
  let parent = doc.resolve(props.getPos()).parent

  return !['tableHeader', 'tableCell', 'taskItem', 'listItem'].includes(parent.type.name)
}
</script>
