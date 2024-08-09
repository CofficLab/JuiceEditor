<template>
  <Button
    v-if="!editor.isActive('heading')"
    @click="focusedNode.toggleToc().run()"
    tip="显示/隐藏TOC"
    size="md"
  >
    <img :src="icon" v-if="iconOnly" />
    <span v-if="!iconOnly">加粗</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import Button from '../../ui/Button.vue'
import icon from '../../assets/bold.svg'

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
  iconOnly: {
    type: Boolean,
    default: true
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
