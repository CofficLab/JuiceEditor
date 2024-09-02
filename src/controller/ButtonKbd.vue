<template>
  <Button tip="Kbd" size="md" @click="editor.chain().focus().toggleKbd().run()"
    :class="{ 'is-active': editor.isActive(KBD) }">
    <IconKeyboard />
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import IconKeyboard from '../ui/icons/Keyboard.vue'
import Button from '../ui/Button.vue'
import { KBD } from '../config/nodes';

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})
</script>
