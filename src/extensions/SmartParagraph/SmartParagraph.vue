<template>
  <NodeViewWrapper>
    <div :class="{
      [props.node.attrs.class]: true,
      'py-2': true,
      'flex flex-row': isBanner,
      'shadow-sm backdrop-blur': isBanner
    }">
      <Info v-if="isInfo" class="w-5 h-6 ml-2 mr-1 inline" contenteditable="false"></Info>
      <Question v-if="isQuestion" class="w-5 h-6 ml-2 mr-1" contenteditable="false"></Question>
      <NodeViewContent contenteditable="true" class="border border-none dark:border-cyan-800 inline" />
    </div>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import Info from '../../ui/icons/Info.vue'
import Question from '../../ui/icons/Question.vue'
import { computed } from 'vue'

const props = defineProps(nodeViewProps)
const isInfo = computed(() => props.node.attrs.type == 'info')
const isQuestion = computed(() => props.node.attrs.type == 'question')
const isBanner = computed(() => isInfo.value || isQuestion.value)
</script>
