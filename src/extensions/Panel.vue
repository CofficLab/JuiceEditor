<template>
  <div
    ref="panel"
    class="dropdown dropdown-open w-full z-50"
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
        { 'outline-orange-600 outline-dashed outline-2 outline-offset-1': isSelected }
      ]"
    >
      <slot name="content"></slot>
    </div>

    <div
      tabindex="0"
      class="my-2 dropdown-content z-50"
      v-show="isSelected"
      contenteditable="false"
    >
      <div class="join border border-accent/30 bg-opacity-70 shadow-2xl operators">
        <slot name="operators"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  inline: {
    type: Boolean,
    default: false
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

onMounted(() => {
  document.addEventListener('click', onClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onClick)
})
</script>

<style lang="postcss">
.operators {
  button {
    @apply btn btn-sm join-item px-2 py-0;
  }
}
</style>
