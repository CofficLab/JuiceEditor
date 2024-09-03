<template>
  <div v-show="visible" ref="dom">
    <template v-if="!canShowDrawing">
      <Card title="请将窗口调宽一点" subTitle="画图要求的最小宽度：1000" line1="当前宽度" :line2="width.toString()"></Card>
    </template>

    <template v-else>
      <Card title="正在打开画图界面" :showLoading="true"></Card>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'
import Card from '../../ui/Card.vue'
import DomHelper from '../../helper/DomHelper';

const loadingDialog = document.createElement('dialog')
loadingDialog.style.border = 'none'

const dom = ref<HTMLElement>(null as unknown as HTMLElement)

const props = defineProps({
  onReady: {
    type: Function,
    default: () => {
      console.log('宽度合适')
    }
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const width = ref(window.innerWidth)
const canShowDrawing = ref(isWidthEnough())
const visible = computed(() => props.visible)

function isWidthEnough() {
  return width.value >= 1000
}

// 更新窗口宽度
// drawio有bug，当页面宽度小于1000px时，画图页面无法弹出 形状 菜单
function refreshWidth() {
  width.value = window.innerWidth
  canShowDrawing.value = isWidthEnough()

  if (canShowDrawing.value && props.visible) {
    props.onReady()
  }
}

function showModal() {
  loadingDialog.classList.add('modal')
  loadingDialog.appendChild(dom.value)

  let shadowRoot = DomHelper.querySelector('juice-editor')!.shadowRoot!

  shadowRoot.appendChild(loadingDialog)
  loadingDialog.showModal()
}

onMounted(() => {
  console.log('Opening mounted')
  window.addEventListener('resize', refreshWidth)
  if (canShowDrawing.value && props.visible) {
    props.onReady()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', refreshWidth)
})

watch(visible, () => {
  if (!props.visible) {
    return loadingDialog.close()
  }

  showModal()

  if (canShowDrawing.value) {
    props.onReady()
  }
})
</script>
