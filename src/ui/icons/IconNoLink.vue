<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(value)
  },
  color: {
    type: String,
    default: 'current',
    validator: (value: string) => ['current', 'primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
  }
})

const sizeClass = computed(() => {
  const sizeMap = {
    'xs': 'w-3 h-3',
    'sm': 'w-4 h-4',
    'md': 'w-6 h-6',
    'lg': 'w-8 h-8',
    'xl': 'w-10 h-10',
    '2xl': 'w-12 h-12',
    '3xl': 'w-16 h-16'
  }
  return sizeMap[props.size as keyof typeof sizeMap] || sizeMap['md']
})

const colorClass = computed(() => {
  const colorMap = {
    'current': 'currentColor',
    'primary': '#3490dc',
    'secondary': '#6574cd',
    'success': '#38c172',
    'warning': '#ffed4a',
    'danger': '#e3342f'
  };
  return colorMap[props.color as keyof typeof colorMap] || colorMap['current'];
});
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="colorClass"
    :class="sizeClass" class="scale-125">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
  </svg>
</template>
