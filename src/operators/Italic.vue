<template>
  <button
    @click="focusedNode.toggleItalic().run()"
    class="tooltip"
    data-tip="斜体"
    :class="{ 'is-active': editor.isActive('italic') }"
  >
    <img src="../assets/italic.svg" v-if="iconOnly" />
    <span v-if="!iconOnly">斜体</span>
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
  iconOnly: {
    type: Boolean,
    default: true
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
