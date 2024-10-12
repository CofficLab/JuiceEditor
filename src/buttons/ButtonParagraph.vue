<template>
  <Button @click="focusedNode.setParagraph().run()" tip="正文" :size="size" :shape="shape"
    :class="{ 'is-active': editor.isActive(PARAGRAPH, { level: 3 }) }">
    <IconChapter v-if="iconOnly"></IconChapter>
    <span v-if="!iconOnly">正文</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Button from '../ui/Button.vue'
import IconChapter from '../ui/icons/IconChapter.vue'
import { PARAGRAPH } from '../config/nodes';

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
