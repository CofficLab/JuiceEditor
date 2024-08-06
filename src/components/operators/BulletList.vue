<template>
  <Button
    @click="focusedNode.toggleBulletList().run()"
    data-tip="无序列表"
    :class="{ 'is-active': editor.isActive('bulletList'), tooltip: iconOnly }"
  >
    <img :src="bulletListIcon" v-if="iconOnly" />
    <span v-if="!iconOnly">无序列表</span>
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import Button from '../../ui/Button.vue'
import bulletListIcon from '../../assets/list.bullet.svg'

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
