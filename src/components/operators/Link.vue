<template>
  <Button
    v-if="!editor.isActive('link')"
    @click="setLink"
    tip="链接"
    size="md"
    :class="{ 'btn-disabled': editor.isActive('link'), tooltip: iconOnly }"
  >
    <IconLink v-if="iconOnly"></IconLink>
    <span v-if="!iconOnly">链接</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import Button from '../../ui/Button.vue'
import IconLink from '../../ui/Icons/IconLink.vue'

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
