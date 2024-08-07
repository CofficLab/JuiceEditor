<template>
  <div class="inline">
    <div
      class="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 -translate-x-1/2 left-1/2 bottom-full mb-2"
    >
      This is a tooltip!
    </div>

    <button
      class="h-8 px-2 prose bg-gray-50 dark:bg-slate-800 dark:hover:bg-slate-500 hover:bg-blue-200"
      :class="{
        'text-xs': props.size === 'xs',
        'text-sm': props.size === 'sm',
        'text-md w-12': props.size === 'md',
        'text-lg': props.size === 'lg',
        'text-xl': props.size === 'xl'
      }"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'auto'
  }
})
</script>
