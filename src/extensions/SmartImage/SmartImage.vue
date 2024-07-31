<template>
  <NodeViewWrapper>
    <div>
      <Draw v-bind="props" v-if="props.node.attrs.draw"></Draw>
      <Image v-bind="props" v-else />
    </div>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Draw from './Draw.vue'
import Image from './Image.vue'

const props = defineProps(nodeViewProps)
</script>
