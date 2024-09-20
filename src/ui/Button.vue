<template>
  <div class="inline flex h-10 my-auto prose bg-red-900 dark:prose-invert">
    <div class="absolute px-2 mb-1 text-xs text-white bg-gray-700 rounded group-hover:block bottom-full"
      v-text="props.tip" v-if="showTip && props.tip"></div>

    <button @mouseover="showTip = true" @mouseleave="showTip = false" :class="{
      'h-full px-2 items-center ': true,
      'text-xs': props.size === 'xs',
      'text-sm': props.size === 'sm',
      'text-md w-12': props.size === 'md',
      'text-lg': props.size === 'lg',
      'text-xl': props.size === 'xl',
      'bg-gray-100 dark:bg-slate-800': true,
      'dark:hover:bg-slate-500 hover:bg-blue-200': true
    }">
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showTip = ref(false)

const props = defineProps({
  size: {
    type: String,
    default: 'auto'
  },
  tip: {
    type: String,
    default: ''
  }
})
</script>
