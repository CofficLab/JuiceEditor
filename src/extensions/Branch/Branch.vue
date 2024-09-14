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
import { ref, onMounted, computed } from 'vue'
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import Button from '../../ui/Button.vue';

const props = defineProps(nodeViewProps)

const versions = ref<number[]>([])
const currentVersion = ref(0)

const node = computed(() => props.node)

onMounted(() => {
  props.node.content.forEach((node, index) => {
    console.log(node)
    versions.value.push(node.attrs.version)
  })

  console.log(versions.value)
})

const switchVersion = (index: number) => {
  currentVersion.value = index
  props.updateAttributes({
    currentVersion: index
  })
}
</script>
