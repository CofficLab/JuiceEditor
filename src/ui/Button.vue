<template>
  <div class="inline my-auto bg-red-900 h-8">
    <div
      class="absolute group-hover:block bg-gray-700 text-white text-xs rounded px-2 bottom-full mb-1"
      v-text="props.tip"
      v-if="showTip && props.tip"
    ></div>

    <button
      @mouseover="showTip = true"
      @mouseleave="showTip = false"
      :class="{
        'h-8 px-2 items-center ': true,
        'text-xs': props.size === 'xs',
        'text-sm': props.size === 'sm',
        'text-md w-12': props.size === 'md',
        'text-lg': props.size === 'lg',
        'text-xl': props.size === 'xl',
        'bg-gray-100 dark:bg-slate-800': true,
        'dark:hover:bg-slate-500 hover:bg-blue-200': true
      }"
    >
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
