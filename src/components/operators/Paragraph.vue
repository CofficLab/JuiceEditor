<template>
  <Button
    @click="focusedNode.setParagraph().run()"
    data-tip="正文"
    :class="{ 'is-active': editor.isActive('paragraph', { level: 3 }), tooltip: iconOnly }"
  >
    <img :src="icon" v-if="iconOnly" />
    <span v-if="!iconOnly">正文</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import icon from '../../assets/character.svg'
import Button from '../../ui/Button.vue'

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
