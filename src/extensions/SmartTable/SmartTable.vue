<template>
  <NodeViewWrapper contenteditable="true">
    <Panel :deleteNode="props.deleteNode" :readOnly="!isEditable" :editor="props.editor" :node="props.node"
      :getPos="props.getPos">
      <template v-slot:content>
        <NodeViewContent as="div" v-bind:contenteditable="isEditable" />
      </template>

      <template v-slot:operators>

      </template>
    </Panel>
  </NodeViewWrapper>
</template>

<script setup lang="ts">


</script>
