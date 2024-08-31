<template>
  <Button @click="focusedNode.setHeading({ level: props.level as Level }).run()" size="md" :tip="props.level + '号标题'"
    :class="{
      'is-active': editor.isActive(HEADING, { level: props.level })
    }">
    <span v-text="text"></span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import Button from '../ui/Button.vue'
import { computed } from 'vue'
import { HEADING } from '../config/nodes';

export declare type Level = 1 | 2 | 3 | 4 | 5 | 6

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  iconOnly: {
    type: Boolean,
    default: true
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
const text = computed(() => {
  return props.iconOnly ? 'H' + props.level : props.level + '号标题'
})
</script>
