<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import Button from '../ui/Button.vue'
import { RiCodeBlock } from '@remixicon/vue';

defineProps({
  editor: {
    type: Editor,
    required: true
  },
  shape: {
    type: String,
    default: 'rectangle'
  },
  size: {
    type: String,
    default: 'sm'
  },
  iconOnly: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <Button tip="代码块" :size="size" @click="editor.chain().focus().insertSmartPre().run()"
    :class="{ 'is-active': editor.isActive('SmartPre') }" :shape="shape">
    <RiCodeBlock v-if="iconOnly" size="36px"></RiCodeBlock>
  </Button>
</template>
