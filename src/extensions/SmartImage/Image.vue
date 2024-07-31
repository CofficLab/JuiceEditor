<template>
  <node-view-wrapper>
    <Panel>
      <template v-slot:content>
        <img
          ref="imgDom"
          :src="props.node.attrs.src"
          :class="props.node.attrs.class"
          class="p-0 m-0"
        />
      </template>

      <template v-slot:operators>
        <Operators v-bind="props"></Operators>
      </template>
    </Panel>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ref } from 'vue'
import Panel from '../Panel.vue'
import Operators from './Operators.vue'

let imgDom = ref<HTMLImageElement | null>(null)
let props = defineProps(nodeViewProps)
</script>
