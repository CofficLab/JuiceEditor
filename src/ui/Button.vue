<script setup lang="ts">
import { ref, computed } from 'vue'

const showTips = ref(false)
const hovered = ref(false)
const dropdownHovered = ref(false)
const showDropdown = ref(false)

const props = defineProps({
  size: {
    type: String,
    default: 'xs'
  },
  tips: {
    type: String,
    default: ''
  },
  shape: {
    type: String,
    default: 'circle',
    validator: (value: string) => ['rectangle', 'circle', 'square'].includes(value)
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs': return 'h-8 w-8'
    case 'sm': return 'h-10 w-10'
    case 'md': return 'h-12 w-12'
    case 'lg': return 'h-14 w-14'
    case 'xl': return 'h-16 w-16'
    case '2xl': return 'h-20 w-20'

    default: return 'h-10 w-10'
  }
})

function handleMouseover() {
  hovered.value = true
  showTips.value = true
  showDropdown.value = true
}

function handleMouseleave() {
  hovered.value = false
  showTips.value = false
  setTimeout(() => {
    if (!dropdownHovered.value) {
      showDropdown.value = false
    }
  }, 500)
}

function handleDropdownMouseover() {
  hovered.value = true
  showDropdown.value = true
  dropdownHovered.value = true
}

function handleDropdownMouseleave() {
  hovered.value = false
  showDropdown.value = false
  dropdownHovered.value = false
}
</script>

<template>
  <div class="inline my-auto prose dark:prose-invert p-0 m-0" :class="[sizeClass]">
    <div
      class="absolute px-2 mb-1 text-xs text-white bg-gray-700 rounded group-hover:block bottom-full whitespace-nowrap"
      v-text="props.tips" v-if="showTips && props.tips"></div>

    <button @mouseover="handleMouseover" @mouseleave="handleMouseleave" :class="{
      'h-full w-full px-0 items-center flex justify-center': true,
      'text-xs': props.size === 'xs',
      'text-sm': props.size === 'sm',
      'text-md': props.size === 'md',
      'text-lg': props.size === 'lg',
      'text-xl': props.size === 'xl',
      'text-2xl': props.size === '2xl',
      'dark:hover:bg-slate-500 hover:bg-blue-100': true,
      'rounded-full': props.shape === 'circle',
      'rounded-none': props.shape === 'square',
      'rounded': props.shape === 'rectangle'
    }">
      <slot></slot>
    </button>

    <div v-if="showDropdown && $slots['dropdown-item']" @mouseover="handleDropdownMouseover"
      @mouseleave="handleDropdownMouseleave"
      class="bg-slate-100 dark:bg-zinc-900 rounded-box z-50 p-2 shadow flex flex-row w-72 h-72">
      <slot name="dropdown-item"></slot>
    </div>
  </div>
</template>
