<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import Button from '../ui/Button.vue'
import { KBD } from '../config/nodes';
import { RiKeyboardLine } from '@remixicon/vue';

defineProps({
  editor: {
    type: Editor,
    required: true
  },
  size: {
    type: String,
    default: 'sm'
  },
  shape: {
    type: String,
    default: 'square'
  },
  iconOnly: {
    type: Boolean,
    default: true
  },
  iconSize: {
    type: String,
    default: '24px'
  }
})
</script>
<template>
  <Button tip="Kbd" :size="size" :shape="shape" @click="editor.chain().focus().toggleKbd().run()"
    :class="{ 'is-active': editor.isActive(KBD) }">
    <RiKeyboardLine v-if="iconOnly" :size="iconSize"></RiKeyboardLine>
  </Button>
</template>