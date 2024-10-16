<template>
  <Button v-if="!editor.isActive(HEADING)" @click="focusedNode.toggleBold().run()" tip="翻译成英语" :size="size"
    :shape="shape">
    <IconBold v-if="iconOnly"></IconBold>

    <span v-if="!iconOnly">翻译成英语</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Button from '../ui/Button.vue'
import IconBold from '../ui/icons/IconBold.vue'
import { HEADING } from '../config/nodes';

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
