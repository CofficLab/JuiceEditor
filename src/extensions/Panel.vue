<template>
  <div
    ref="panel"
    class="z-10 w-full dropdown dropdown-open"
    :id="id"
    :class="{
      inline: inline,
      'dropdown-bottom': dropdownBottom,
      'dropdown-top': !dropdownBottom
    }"
  >
    <div
      tabindex="0"
      role="button"
      :class="{ inline: inline }"
      v-bind:class="[
        {
          'bg-base-200': isSelected,
          'outline-orange-600 outline-dashed outline-2 outline-offset-1': isSelected && showBorder
        }
      ]"
    >
      <slot name="content"></slot>
    </div>

    <div
      tabindex="0"
      class="z-50 my-2 dropdown-content"
      v-show="isSelected"
      contenteditable="false"
    >
      <div class="border shadow-2xl join border-accent/60 bg-opacity-90 operators">
        <slot name="operators"></slot>
        <button class="btn btn-sm join-item tooltip" data-tip="删除" @click="deleteNode">
          <IconDelete class="w-5 h-6"></IconDelete>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import IconDelete from './BaseIcons/Delete.vue'
import { useAppStore } from '../provider/AppStore'

const app = useAppStore()

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
  }
})
const id = 'panel-' + uuidv4()
const isSelected = ref(false)
const panel = ref<HTMLElement | null>(null)
const dropdownBottom = ref(true)

onMounted(() => {
  document.addEventListener('click', onClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onClick)
})

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
  } else {
    console.log('Clicked element:', e.target)
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
