<template>
  <NodeViewWrapper class="branch">
    <div>
      <Button v-for="(version, index) in versions" :key="index" @click="switchVersion(index)">
        版本 {{ index + 1 }}
      </Button>

      <NodeViewContent></NodeViewContent>
    </div>
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import Button from '../../ui/Button.vue';

const props = defineProps(nodeViewProps)

const versions = ref<number[]>([])
const currentVersion = ref(0)

onMounted(() => {
  props.node.content.forEach((node, index) => {
    versions.value.push(node.attrs.version)
  })
})

const switchVersion = (index: number) => {
  currentVersion.value = index
  props.updateAttributes({
    currentVersion: index
  })
}
</script>
