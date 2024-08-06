<template>
  <Button
    class="w-10 tooltip"
    data-tip="代码块组"
    @click="editor.chain().focus().insertGroupPre().run()"
    :class="{ 'is-active': editor.isActive('SmartPre') }"
  >
    <img :src="icon" class="m-0" />
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import Button from '../../ui/Button.vue'
import icon from '../../assets/code.bracket.svg'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})
</script>
