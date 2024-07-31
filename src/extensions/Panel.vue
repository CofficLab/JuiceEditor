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
        { 'outline-orange-600 outline-dashed outline-2 outline-offset-1': isSelected && showBorder }
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

const props = defineProps({
  inline: {
    type: Boolean,
    default: false
  },
  showBorder: {
    type: Boolean,
    default: true
  },
  deleteNode: {
    type: Function,
    required: true
  }
})
const id = 'panel' + uuidv4()
const isSelected = ref(false)
const panel = ref<HTMLElement | null>(null)
const dropdownBottom = ref(true)

function getTopOffset() {
  let dom = panel.value
  return dom?.getBoundingClientRect().top ?? 0
}

function onClick(e: Event) {
  dropdownBottom.value = getTopOffset() < 100

  let target = e.target as HTMLElement
  isSelected.value = target.closest('#' + id) != null
}

function deleteNode() {
  props.deleteNode()
}

onMounted(() => {
  document.addEventListener('click', onClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onClick)
})
</script>
