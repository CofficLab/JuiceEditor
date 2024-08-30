<template>
  <button
    @click="focusedNode.toggleBlockquote().run()"
    class="tooltip"
    data-tip="引用"
    size="md"
    :class="{ 'is-active': editor.isActive('blockquote') }"
  >
    <img :src="icon" />
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import icon from '../../assets/quote.opening.svg'

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
