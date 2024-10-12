<template>
  <div class="inline my-auto prose dark:prose-invert p-0 m-0" :class="[sizeClass]">
    <div
      class="absolute px-2 mb-1 text-xs text-white bg-gray-700 rounded group-hover:block bottom-full whitespace-nowrap"
      v-text="props.tip" v-if="showTip && props.tip"></div>

    <button @mouseover="showTip = true" @mouseleave="showTip = false" :class="{
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const showTip = ref(false)

const props = defineProps({
  size: {
    type: String,
    default: 'xs'
  },
  tip: {
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
</script>
