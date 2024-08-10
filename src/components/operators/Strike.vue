<template>
  <Button
    @click="focusedNode.toggleStrike().run()"
    tip="中横线"
    size="md"
    :class="{ 'is-active': editor.isActive('strike') }"
  >
    <IconStrike v-if="iconOnly"></IconStrike>
    <span v-if="!iconOnly">中横线</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import Button from '../../ui/Button.vue'
import IconStrike from '../icons/IconStrike.vue'

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
