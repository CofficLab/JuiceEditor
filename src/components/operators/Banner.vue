<template>
  <button
    class="tooltip"
    data-tip="提示框"
    @click="editor.chain().focus().toggleBanner().run()"
    :class="{ 'is-active': editor.isActive('banner') }"
  >
    <img :src="icon" alt="" class="m-0" />
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import icon from '../../assets/123.rectangle.fill.svg'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})
</script>
