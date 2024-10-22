<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { useFeatureStore } from '../store/FeatureStore'
import Button from '../ui/Button.vue'
import { RiPencilRuler2Line } from '@remixicon/vue';

const feature = useFeatureStore()

defineProps({
  editor: {
    type: Editor,
    required: true
  },
  size: {
    type: String,
    default: 'sm'
  },
  iconOnly: {
    type: Boolean,
    default: true
  }
})

const isDrawEnable = feature.drawEnabled
</script>
<template>
  <Button tip="画图" :size="size" v-if="isDrawEnable" @click="editor.commands.insertDraw()">
    <RiPencilRuler2Line v-if="iconOnly" size="36px"></RiPencilRuler2Line>
  </Button>
</template>