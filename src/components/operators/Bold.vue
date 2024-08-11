<template>
  <Button
    v-if="!editor.isActive('heading')"
    @click="focusedNode.toggleBold().run()"
    tip="加粗"
    size="md"
  >
    <IconBold v-if="iconOnly"></IconBold>

    <span v-if="!iconOnly">加粗</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import Button from '../../ui/Button.vue'
import IconBold from '../../ui/icons/IconBold.vue'

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
