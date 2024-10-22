<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import Button from '../ui/Button.vue'
import { computed } from 'vue'
import { HEADING } from '../config/nodes';
import { RiH1, RiH2, RiH3, RiH4, RiH5, RiH6 } from '@remixicon/vue';

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
  },
  shape: {
    type: String,
    default: 'rectangle'
  },
  iconSize: {
    type: String,
    default: '36px'
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
<template>
  <Button @click="focusedNode.setHeading({ level: props.level as Level }).run()" size="sm" :tip="props.level + '号标题'"
    :shape="shape" :class="{
      'is-active': editor.isActive(HEADING, { level: props.level })
    }">
    <RiH1 v-if="level == 1" :size="iconSize"></RiH1>
    <RiH2 v-if="level == 2" :size="iconSize"></RiH2>
    <RiH3 v-if="level == 3" :size="iconSize"></RiH3>
    <RiH4 v-if="level == 4" :size="iconSize"></RiH4>
    <RiH5 v-if="level == 5" :size="iconSize"></RiH5>
    <RiH6 v-if="level == 6" :size="iconSize"></RiH6>
  </Button>
</template>