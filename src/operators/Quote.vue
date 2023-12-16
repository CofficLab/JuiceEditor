<template>
  <button
    @click="focusedNode.toggleBlockquote().run()"
    class="tooltip"
    data-tip="引用"
    :class="{ 'is-active': editor.isActive('blockquote') }"
  >
    <img src="../assets/quote.opening.svg" />
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
