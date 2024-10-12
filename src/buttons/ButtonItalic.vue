<template>
  <Button @click="focusedNode.toggleItalic().run()" tip="斜体" :size="size" :shape="shape"
    :class="{ 'is-active': editor.isActive(ITALIC) }">
    <IconItalic v-if="iconOnly"></IconItalic>
    <span v-if="!iconOnly">斜体</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Button from '../ui/Button.vue'
import IconItalic from '../ui/icons/IconItalic.vue'
import { ITALIC } from '../config/nodes';

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
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
