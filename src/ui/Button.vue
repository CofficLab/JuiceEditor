<script setup lang="ts">
import { ref, computed } from 'vue'

const showTips = ref(false)

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
  },
  class: {
    type: String,
    default: ''
  },
  dropdownPosition: {
    type: String,
    default: 'right'
  },
  dropdownBackgroundClass: {
    type: String,
    default: 'bg-base-300 dark:bg-zinc-900'
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
</script>

<template>
  <div :class="{
    'dropdown dropdown-hover': true,
    'dropdown-top': props.dropdownPosition === 'top',
    'dropdown-right': props.dropdownPosition === 'right',
    'dropdown-bottom': props.dropdownPosition === 'bottom',
    [sizeClass]: true && props.class.length == 0,
    [props.class]: true
  }">
    <div
      class="absolute px-2 mb-1 text-xs text-white bg-gray-700 rounded group-hover:block bottom-full whitespace-nowrap"
      v-text="props.tips" v-if="showTips && props.tips"></div>

    <button tabindex="0" role="button" @mouseover="showTips = true" @mouseleave="showTips = false" :class="{
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

    <div tabindex="0" v-if="$slots['dropdown-item']" :class="{
      [props.dropdownBackgroundClass]: true,
      'dropdown-content menu rounded-box z-50 p-2 shadow': true
    }">
      <slot name="dropdown-item"></slot>
    </div>
  </div>
</template>