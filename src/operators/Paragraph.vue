<template>
  <button
    @click="focusedNode.setParagraph().run()"
    class="tooltip"
    data-tip="正文"
    :class="{ 'is-active': editor.isActive('paragraph', { level: 3 }) }"
  >
    <img src="../assets/character.svg" />
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
