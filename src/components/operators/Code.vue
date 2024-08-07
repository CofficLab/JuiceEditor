<template>
  <button
    @click="focusedNode.toggleCode().run()"
    data-tip="代码"
    size="md"
    :class="{ 'is-active': editor.isActive('code'), tooltip: iconOnly }"
  >
    <img :src="icon" v-if="iconOnly" />
    <span v-if="!iconOnly">行内代码</span>
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import icon from '../../assets/code.bracket.svg'

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
