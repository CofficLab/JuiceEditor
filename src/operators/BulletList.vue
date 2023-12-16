<template>
  <button
    @click="focusedNode.toggleBulletList().run()"
    class="tooltip"
    data-tip="无序列表"
    :class="{ 'is-active': editor.isActive('bulletList') }"
  >
    <img src="../assets/list.bullet.svg" />
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
