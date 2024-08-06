<template>
  <Button
    v-if="!editor.isActive('link')"
    @click="setLink"
    data-tip="链接"
    :class="{ 'btn-disabled': editor.isActive('link'), tooltip: iconOnly }"
  >
    <img :src="icon" v-if="iconOnly" />
    <span v-if="!iconOnly">链接</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import Button from '../../ui/Button.vue'
import icon from '../../assets/link.svg'

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
