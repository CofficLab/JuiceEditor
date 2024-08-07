<template>
  <Button
    class="w-10 tooltip"
    data-tip="代码"
    size="md"
    @click="editor.chain().focus().insertCodeBlock().run()"
    :class="{ 'is-active': editor.isActive('SmartCode') }"
  >
    <img :src="icon" class="m-0" />
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import icon from '../../assets/code.bracket.svg'
import Button from '../../ui/Button.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})
</script>
