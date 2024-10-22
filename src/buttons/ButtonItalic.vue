<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Button from '../ui/Button.vue'
import { ITALIC } from '../config/nodes';
import { RiItalic } from '@remixicon/vue';

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
  <Button @click="focusedNode.toggleItalic().run()" tip="斜体" :size="size" :shape="shape"
    :class="{ 'is-active': editor.isActive(ITALIC) }">
    <RiItalic v-if="iconOnly" :size="iconSize"></RiItalic>
    <span v-if="!iconOnly">斜体</span>
  </Button>
</template>
