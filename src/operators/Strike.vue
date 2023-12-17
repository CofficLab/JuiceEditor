<template>
  <button
    @click="focusedNode.toggleStrike().run()"
    class="tooltip"
    data-tip="中横线"
    :class="{ 'is-active': editor.isActive('strike') }"
  >
    <img src="../assets/strikethrough.svg" v-if="iconOnly" />
    <span v-if="!iconOnly">中横线</span>
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
