<template>
  <Button
    @click="focusedNode.toggleBulletList().run()"
    tip="无序列表"
    size="md"
    :class="{ 'is-active': editor.isActive('bulletList') }"
  >
    <IconBulletList v-if="iconOnly"></IconBulletList>
    <span v-if="!iconOnly">无序列表</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import Button from '../../ui/Button.vue'
import bulletListIcon from '../../assets/list.bullet.svg'
import IconBulletList from '../icons/IconBulletList.vue'

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
