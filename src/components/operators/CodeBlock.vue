<template>
  <button
    data-tip="代码"
    @click="editor.chain().focus().toggleCodeBlock().run()"
    :class="{ 'is-active': editor.isActive('codeBlock') }"
  >
    <img :src="icon" class="m-0" />
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import icon from '../../assets/code.bracket.svg'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})
</script>
