<template>
  <button
    @click="focusedNode.toggleHeading({ level: props.level as Level }).run()"
    class="tooltip"
    :data-tip="props.level + '号标题'"
    :class="{ 'is-active': editor.isActive('heading', { level: props.level }) }"
  >
    H{{ props.level }}
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'

export declare type Level = 1 | 2 | 3 | 4 | 5 | 6

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
  level: {
    type: Number,
    required: true
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
