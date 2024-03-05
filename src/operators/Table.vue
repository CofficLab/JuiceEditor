<template>
  <button
    class="w-10 tooltip"
    data-tip="添加表格"
    v-if="isTableEnable"
    @click="editor.chain().focus().insertSmartTable().run()"
  >
    <IconTableCell></IconTableCell>
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import TiptapAgent from '../entities/TiptapAgent'
import { computed } from 'vue'
import IconTableCell from '../icons/IconTableCell.vue'

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const isTableEnable = TiptapAgent.isTableEnable(props.editor)
</script>
