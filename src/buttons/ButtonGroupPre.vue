<template>
  <Button tip="代码块组" :size="size" @click="editor.chain().focus().insertGroupPre().run()"
    :class="{ 'is-active': editor.isActive('SmartPre') }">
    <IconCode></IconCode>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import Button from '../ui/Button.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  },
  size: {
    type: String,
    default: 'sm'
  }
})
</script>
