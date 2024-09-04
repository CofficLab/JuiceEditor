<template>
  <Button v-if="!editor.isActive('link')" @click="setLink" tip="链接" size="md"
    :class="{ 'btn-disabled': editor.isActive(A), tooltip: iconOnly }">
    <IconLink v-if="iconOnly"></IconLink>
    <span v-if="!iconOnly">链接</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import Button from '../ui/Button.vue'
import IconLink from '../ui/icons/IconLink.vue'
import { A } from '../config/nodes';

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
