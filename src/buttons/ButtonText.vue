<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Button from '../ui/Button.vue'
import { PARAGRAPH } from '../config/nodes';
import { RiText } from '@remixicon/vue';

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
  <Button @click="focusedNode.setParagraph().run()" tip="正文" :shape="shape"
    :class="{ 'is-active': editor.isActive(PARAGRAPH, { level: 3 }) }">
    <RiText v-if="iconOnly" :size="iconSize"></RiText>
    <span v-if="!iconOnly">正文</span>
  </Button>
</template>
