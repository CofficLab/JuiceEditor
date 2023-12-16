<template>
  <button
    v-if="!editor.isActive('link')"
    @click="setLink"
    class="tooltip"
    data-tip="链接"
    :class="{ 'btn-disabled': editor.isActive('link') }"
  >
    <img src="../assets/link.svg" />
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

const setLink = () => {
  const nodes = props.editor.state.selection.content().content
  let text = ''
  nodes.forEach((node) => {
    text += node.textContent
  })

  props.editor
    .chain()
    .deleteSelection()
    .insertContent('<a href="' + text + '">' + text + '</a>')
    .run()
}
</script>
