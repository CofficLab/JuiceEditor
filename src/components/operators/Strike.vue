<template>
  <Button
    @click="focusedNode.toggleStrike().run()"
    tip="中横线"
    size="md"
    :class="{ 'is-active': editor.isActive('strike') }"
  >
    <img :src="icon" v-if="iconOnly" />
    <span v-if="!iconOnly">中横线</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import Button from '../../ui/Button.vue'
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
