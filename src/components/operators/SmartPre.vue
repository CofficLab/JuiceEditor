<template>
  <Button
    tip="代码块"
    @click="editor.chain().focus().insertSmartPre().run()"
    :class="{ 'is-active': editor.isActive('SmartPre') }"
  >
    <IconCode></IconCode>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import IconCode from '../icons/IconCode.vue'
import Button from '../../ui/Button.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})
</script>
