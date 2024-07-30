<template>
  <button
    @click="focusedNode.toggleStrike().run()"
    data-tip="中横线"
    :class="{ 'is-active': editor.isActive('strike'), tooltip: iconOnly }"
  >
    <img :src="icon" v-if="iconOnly" />
    <span v-if="!iconOnly">中横线</span>
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import icon from '../../assets/strikethrough.svg'

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
