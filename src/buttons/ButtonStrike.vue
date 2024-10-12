<template>
  <Button @click="focusedNode.toggleStrike().run()" tip="中横线" :size="size" :shape="shape"
    :class="{ 'is-active': editor.isActive(STRIKE) }">
    <IconStrike v-if="iconOnly"></IconStrike>
    <span v-if="!iconOnly">中横线</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Button from '../ui/Button.vue'
import IconStrike from '../ui/icons/IconStrike.vue'
import { STRIKE } from '../config/nodes';

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
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
