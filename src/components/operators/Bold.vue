<template>
  <button
    v-if="!editor.isActive('heading')"
    @click="focusedNode.toggleBold().run()"
    class="tooltip"
    data-tip="加粗"
  >
    <img :src="icon" v-if="iconOnly" />
    <span v-if="!iconOnly">加粗</span>
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
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
