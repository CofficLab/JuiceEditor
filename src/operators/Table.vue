<template>
  <button
    class="w-10 tooltip"
    data-tip="添加表格"
    v-if="isTableEnable"
    @click="editor.chain().focus().insertSmartTable().run()"
  >
    <img src="../assets/tablecells.svg" alt="" class="m-0" />
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import TiptapAgent from '../entities/TiptapAgent'
import { computed } from 'vue'

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const isTableEnable = TiptapAgent.isTableEnable(props.editor)

const focusedNode = computed(() => props.editor.chain().focus())
</script>
