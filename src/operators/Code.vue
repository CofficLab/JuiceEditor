<template>
  <button
    @click="focusedNode.toggleCode().run()"
    data-tip="代码"
    :class="{ 'is-active': editor.isActive('code'), tooltip: iconOnly }"
  >
    <img src="../assets/code.bracket.svg" v-if="iconOnly" />
    <span v-if="!iconOnly">代码</span>
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
