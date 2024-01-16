<template>
  <button
    class="w-10 tooltip"
    data-tip="画图"
    v-if="isDrawEnable"
    @click="editor.commands.insertDrawIo()"
  >
    <img src="../assets/compass.drawing.svg" alt="" class="m-0" />
  </button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import TiptapAgent from '../entities/TiptapAgent'
import { useFeatureStore } from '../stores/FeatureStore';

const feature = useFeatureStore()

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const isDrawEnable = TiptapAgent.isDrawEnable(props.editor) && feature.drawEnabled
</script>
