<template>
  <Button
    tip="代码块组"
    size="md"
    @click="editor.chain().focus().insertGroupPre().run()"
    :class="{ 'is-active': editor.isActive('SmartPre') }"
  >
    <IconCode></IconCode>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import Button from '../../ui/Button.vue'
import IconCode from '../../ui/icons/IconCode.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})
</script>
