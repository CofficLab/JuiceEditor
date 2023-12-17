<template>
  <button
    @click="focusedNode.toggleBulletList().run()"
    data-tip="无序列表"
    :class="{ 'is-active': editor.isActive('bulletList'), tooltip: iconOnly }"
  >
    <img src="../assets/list.bullet.svg" v-if="iconOnly" />
    <span v-if="!iconOnly">无序列表</span>
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'

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
