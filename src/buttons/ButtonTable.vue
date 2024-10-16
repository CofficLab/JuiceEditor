<template>
  <Button tip="表格" :size="size" v-if="enable" @click="editor.chain().focus().insertTable().run()">
    <IconTableCell></IconTableCell>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import IconTableCell from '../ui/icons/IconTableCell.vue'
import Button from '../ui/Button.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  },
  enable: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'sm'
  }
})
</script>
