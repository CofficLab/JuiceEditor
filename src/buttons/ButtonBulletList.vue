<template>
  <Button @click="focusedNode.toggleBulletList().run()" tip="无序列表" :size="size" :shape="shape"
    :class="{ 'is-active': editor.isActive(BULLET_LIST) }">
    <IconBulletList v-if="iconOnly"></IconBulletList>
    <span v-if="!iconOnly">无序列表</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Button from '../ui/Button.vue'
import IconBulletList from '../ui/icons/IconBulletList.vue'
import { BULLET_LIST } from '../config/nodes';

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
  iconOnly: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'sm'
  },
  shape: {
    type: String,
    default: 'square'
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
