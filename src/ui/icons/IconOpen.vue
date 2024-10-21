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
      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
</template>
