<template>
  <div>
    <Card title="请将窗口调宽一点" subTitle="画图要求的最小宽度：1000" line1="当前宽度" :line2="width.toString()" v-if="!canShowDrawing">
    </Card>

    <Card title="正在打开画图界面" :showLoading="true" v-else></Card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Card from '../../ui/Card.vue'
import TiptapEditor from '../../model/TiptapEditor';

const props = defineProps({
  editor: {
    type: TiptapEditor,
    required: true
  },
  drawIoLink: {
    type: String,
    required: true
  }
})

const width = ref(window.innerWidth)
const canShowDrawing = ref(isWidthEnough())
const opening = ref(false)

function open() {
  if (opening.value) {
    return
  }

  opening.value = true
  props.editor.commands.openDraw()
  opening.value = false
}

function isWidthEnough() {
  return width.value >= 1000
}

// 更新窗口宽度
// drawio有bug，当页面宽度小于1000px时，画图页面无法弹出 形状 菜单
function refreshWidth() {
  width.value = window.innerWidth
  canShowDrawing.value = isWidthEnough()

  if (canShowDrawing.value) {
    open()
  }
}

onMounted(() => {
  window.addEventListener('resize', refreshWidth)
  if (canShowDrawing.value) {
    open()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', refreshWidth)
})
</script>
