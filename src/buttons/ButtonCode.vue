<template>
  <button @click="focusedNode.toggleCode().run()" data-tip="代码" :size="size" :shape="shape"
    :class="{ 'is-active': editor.isActive(CODE), tooltip: iconOnly }">
    <img :src="icon" v-if="iconOnly" />
    <span v-if="!iconOnly">行内代码</span>
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import icon from '../assets/code.bracket.svg'
import { CODE } from '../config/nodes';

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
  iconOnly: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'sm'
  },
  shape: {
    type: String,
    default: 'square'
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
