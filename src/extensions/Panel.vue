<template>
  <div
    ref="panel"
    class="relative z-10 w-full panel"
    :id="id"
    :class="{
      inline: inline,
      'dropdown-bottom': dropdownBottom,
      'dropdown-top': !dropdownBottom
    }"
  >
    <div class="absolute z-50 -top-10" v-show="operatorsVisible" contenteditable="false">
      <ButtonBar>
        <slot name="operators"></slot>
        <Button tip="删除" @click="deleteNode">
          <IconDelete></IconDelete>
        </Button>
      </ButtonBar>
    </div>

    <div
      tabindex="0"
      role="button"
      :class="{ inline: inline }"
      v-bind:class="[
        {
          'bg-base-200': isSelected,
          'outline-orange-600 outline-dashed outline-2 outline-offset-1': borderVisible
        }
      ]"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import IconDelete from './BaseIcons/Delete.vue'
import Button from '../ui/Button.vue'
import ButtonBar from '../ui/ButtonBar.vue'

const props = defineProps({
  inline: {
    type: Boolean,
    default: false
  },
  showBorder: {
    type: Boolean,
    default: false
  },
  deleteNode: {
    type: Function,
    required: true
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})

const id = 'panel-' + uuidv4()
const isSelected = ref(false)
const panel = ref<HTMLElement | null>(null)
const dropdownBottom = ref(true)
const borderVisible = computed(() => props.showBorder && isSelected.value && !props.readOnly)
const operatorsVisible = computed(() => !props.readOnly && isSelected.value)

onMounted(() => {
  document.addEventListener('click', onClick)

  // 监听来自 iframe 的消息
  window.addEventListener('message', onIframeClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onClick)
  window.removeEventListener('message', onIframeClick)
})

function onIframeClick(event: {
  origin: string
  data: { sender: string; event: string; height?: number; content?: string }
}) {
  if (event.data.event == 'click') {
    let id = event.data.sender

    isSelected.value = false

    if (panel.value?.querySelector('[name="' + id + '"]')) {
      isSelected.value = true
    }
  }
}

function onClick(e: Event) {
  // console.log('🍉 Panel: 事件监听')

  // 获取事件路径
  const path = e.composedPath()

  // 查找目标元素
  const shadowElement = path.find((el) => el instanceof HTMLElement && el.shadowRoot)

  if (shadowElement) {
    const clickedElement = path.find((el) => el !== shadowElement)
    dropdownBottom.value = getTopOffset() < 100

    let target = clickedElement as HTMLElement
    isSelected.value = target.closest('#' + id) != null
  }
}

function getTopOffset() {
  let dom = panel.value
  let offset = dom?.getBoundingClientRect().top ?? 0

  // console.log('getTopOffset', offset)

  return offset
}

function deleteNode() {
  props.deleteNode()
}
</script>
