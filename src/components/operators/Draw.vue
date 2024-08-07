<template>
  <Button tip="画图" v-if="isDrawEnable" @click="editor.commands.insertDraw()">
    <img :src="icon" alt="" class="mx-auto" />
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { useFeatureStore } from '../../provider/FeatureStore'
import IconDraw from '../icons/IconDraw.vue'
import Button from '../../ui/Button.vue'
import icon from '../../assets/compass.drawing.svg'

const feature = useFeatureStore()

defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const isDrawEnable = feature.drawEnabled
</script>
