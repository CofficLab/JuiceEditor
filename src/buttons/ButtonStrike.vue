<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Button from '../ui/Button.vue'
import { STRIKE } from '../config/nodes';
import { RiStrikethrough } from "@remixicon/vue";

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
  iconOnly: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'sm'
  },
  shape: {
    type: String,
    default: 'square'
  },
  iconSize: {
    type: String,
    default: '24px'
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>

<template>
  <Button @click="focusedNode.toggleStrike().run()" tip="中横线" :size="size" :shape="shape"
    :class="{ 'is-active': editor.isActive(STRIKE) }">
    <RiStrikethrough v-if="iconOnly" :size="iconSize"></RiStrikethrough>
    <span v-if="!iconOnly">中横线</span>
  </Button>
</template>
