<template>
  <div
    class="modal-box flex flex-col justify-center items-center w-56 p-0"
    v-show="visible"
    ref="dom"
  >
    <template v-if="!canShowDrawing">
      <div class="font-bold text-lg m-0 mt-4">请将窗口调宽一点</div>
      <p class="text-center text-xs">画图要求的最小宽度：1000</p>
      <div class="stats shadow-3xl bg-blue-100/50 w-full mt-4 rounded-none">
        <div class="stat">
          <div class="stat-title text-center">当前宽度</div>
          <div class="stat-value text-center">{{ width }}</div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="font-bold text-lg m-0 mt-4">正在打开画图界面</div>
      <div class="stats shadow-3xl bg-blue-100/50 w-full mt-4 rounded-none">
        <div class="stat">
          <div class="stat-title text-center">
            <span class="loading loading-ring loading-lg"></span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const loadingDialog = document.createElement('dialog')
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

watch(
  () => props.visible,
  () => {
    if (!props.visible) {
      loadingDialog.close()
    } else if (canShowDrawing.value) {
      props.onReady()

      loadingDialog.classList.add('modal')
      loadingDialog.appendChild(dom.value)
      document.body.appendChild(loadingDialog)
      loadingDialog.showModal()
    }
  }
)
</script>
