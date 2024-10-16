<template>
  <Button tip="画图" :size="size" v-if="isDrawEnable" @click="editor.commands.insertDraw()">
    <IconDraw class="mx-auto" />
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { useFeatureStore } from '../store/FeatureStore'
import IconDraw from '../ui/icons/IconDraw.vue'
import Button from '../ui/Button.vue'

const feature = useFeatureStore()

defineProps({
  editor: {
    type: Editor,
    required: true
  },
  size: {
    type: String,
    default: 'sm'
  }
})

const isDrawEnable = feature.drawEnabled
</script>
