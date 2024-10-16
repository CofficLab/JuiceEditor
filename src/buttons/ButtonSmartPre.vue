<template>
  <Button tip="代码块" :size="size" @click="editor.chain().focus().insertSmartPre().run()"
    :class="{ 'is-active': editor.isActive('SmartPre') }" :shape="shape">
    <IconCode></IconCode>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import IconCode from '../ui/icons/IconCode.vue'
import Button from '../ui/Button.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  },
  shape: {
    type: String,
    default: 'rectangle'
  },
  size: {
    type: String,
    default: 'sm'
  }
})
</script>
