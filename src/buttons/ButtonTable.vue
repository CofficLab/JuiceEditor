<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import Button from '../ui/Button.vue'
import { RiTable2 } from '@remixicon/vue';

defineProps({
  editor: {
    type: Editor,
    required: true
  },
  enable: {
    type: Boolean,
    default: true
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
  <Button tip="表格" :size="size" v-if="enable" @click="editor.chain().focus().insertTable().run()">
    <RiTable2 v-if="iconOnly" size="36px"></RiTable2>
  </Button>
</template>