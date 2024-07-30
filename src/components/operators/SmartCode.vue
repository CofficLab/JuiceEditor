<template>
  <button
    class="tooltip w-10"
    data-tip="代码"
    @click="editor.chain().focus().insertCodeBlock().run()"
    :class="{ 'is-active': editor.isActive('SmartCode') }"
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
