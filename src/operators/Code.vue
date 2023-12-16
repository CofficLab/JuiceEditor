<template>
  <button
    @click="focusedNode.toggleCode().run()"
    class="tooltip"
    data-tip="代码"
    :class="{ 'is-active': editor.isActive('code') }"
  >
    <img src="../assets/code.bracket.svg" />
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
