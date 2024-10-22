<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Button from '../ui/Button.vue'
import { HEADING } from '../config/nodes';
import { RiBold } from '@remixicon/vue';

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
  iconOnly: {
    type: Boolean,
    default: true
  },
  iconSize: {
    type: String,
    default: '24px'
  },
  shape: {
    type: String,
    default: 'square'
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
<template>
  <Button v-if="!editor.isActive(HEADING)" @click="focusedNode.toggleBold().run()" tip="加粗" :shape="shape">
    <RiBold v-if="iconOnly" :size="iconSize"></RiBold>

    <span v-if="!iconOnly">加粗</span>
  </Button>
</template>