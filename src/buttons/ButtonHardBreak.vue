<template>
  <!-- <button @click="setHardBreak">
      <img src="../assets/return.svg" />
    </button> -->
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'

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

function setHardBreak() {
  // focusedNode.value.setHardBreak().run()
}
</script>
