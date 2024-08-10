<template>
  <Button
    @click="focusedNode.setParagraph().run()"
    tip="正文"
    size="md"
    :class="{ 'is-active': editor.isActive('paragraph', { level: 3 }) }"
  >
    <IconChapter v-if="iconOnly"></IconChapter>
    <span v-if="!iconOnly">正文</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import Button from '../../ui/Button.vue'
import IconChapter from '../icons/IconChapter.vue'

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
