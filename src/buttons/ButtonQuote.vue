<template>
  <button @click="focusedNode.toggleBlockquote().run()" class="tooltip" data-tip="引用" :size="size"
    :class="{ 'is-active': editor.isActive(BLOCKQUOTE) }">
    <img :src="icon" />
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import icon from '../../assets/quote.opening.svg'
import { BLOCKQUOTE } from '../config/nodes';

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
  size: {
    type: String,
    default: 'sm'
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
