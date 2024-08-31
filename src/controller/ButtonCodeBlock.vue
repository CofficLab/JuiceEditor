<template>
  <button data-tip="代码" size="md" @click="editor.chain().focus().toggleCodeBlock().run()"
    :class="{ 'is-active': editor.isActive(CODE_BLOCK) }">
    <img :src="icon" class="m-0" />
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import icon from '../assets/code.bracket.svg'
import { CODE_BLOCK } from '../config/nodes';

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})
</script>
