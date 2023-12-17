<template>
  <button
    @click="focusedNode.setParagraph().run()"
    data-tip="正文"
    :class="{ 'is-active': editor.isActive('paragraph', { level: 3 }), tooltip: iconOnly }"
  >
    <img src="../assets/character.svg" v-if="iconOnly" />
    <span v-if="!iconOnly">正文</span>
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
