<template>
  <button
    class="w-10 tooltip"
    data-tip="画图"
    v-if="isDrawEnable"
    @click="editor.commands.insertDraw()"
  >
    <img :src="icon" alt="" class="m-0" />
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { useFeatureStore } from '../../provider/FeatureStore'
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
