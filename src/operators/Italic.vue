<template>
  <button
    @click="focusedNode.toggleItalic().run()"
    class="tooltip"
    data-tip="斜体"
    :class="{ 'is-active': editor.isActive('italic') }"
  >
    <img src="../assets/italic.svg" />
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
