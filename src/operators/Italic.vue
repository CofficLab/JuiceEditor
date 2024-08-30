<template>
  <Button
    @click="focusedNode.toggleItalic().run()"
    tip="斜体"
    size="md"
    :class="{ 'is-active': editor.isActive('italic') }"
  >
    <IconItalic v-if="iconOnly"></IconItalic>
    <span v-if="!iconOnly">斜体</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import Button from '../ui/Button.vue'
import IconItalic from '../ui/icons/IconItalic.vue'

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
