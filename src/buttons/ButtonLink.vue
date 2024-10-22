<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import Button from '../ui/Button.vue'
import { A } from '../config/nodes';
import { RiLink } from '@remixicon/vue';

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
  },
  iconSize: {
    type: String,
    default: '24px'
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
<template>
  <Button v-if="!editor.isActive('link')" @click="setLink" tip="链接" :size="size" :shape="shape"
    :class="{ 'btn-disabled': editor.isActive(A), tooltip: iconOnly }">
    <RiLink v-if="iconOnly" :size="iconSize"></RiLink>
    <span v-if="!iconOnly">链接</span>
  </Button>
</template>