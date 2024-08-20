<template>
  <Button
    tip="Kbd"
    size="md"
    @click="editor.chain().focus().toggleKbd().run()"
    :class="{ 'is-active': editor.isActive('kbd') }"
  >
    <IconKeyboard />
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import IconKeyboard from '../../ui/icons/Keyboard.vue'
import Button from '../../ui/Button.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})
</script>
