<template>
  <button
    class="w-10 tooltip"
    data-tip="添加表格"
    v-if="enable"
    @click="editor.chain().focus().insertSmartTable().run()"
  >
    <IconTableCell></IconTableCell>
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import IconTableCell from '../icons/IconTableCell.vue'

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
