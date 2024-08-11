<template>
  <Button
    tip="添加表格"
    size="md"
    v-if="enable"
    @click="editor.chain().focus().insertSmartTable().run()"
  >
    <IconTableCell></IconTableCell>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import IconTableCell from '../../ui/Icons/IconTableCell.vue'
import Button from '../../ui/Button.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  },
  enable: {
    type: Boolean,
    default: true
  }
})
</script>
