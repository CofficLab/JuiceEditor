<template>
  <Button
    tip="提示框"
    size="md"
    @click="editor.chain().focus().toggleBanner().run()"
    :class="{ 'is-active': editor.isActive('banner') }"
  >
    <IconBanner />
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import IconBanner from '../icons/IconBanner.vue'
import Button from '../../ui/Button.vue'

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})
</script>
