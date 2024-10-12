<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="colorClass"
    :class="sizeClass">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

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
});

const sizeClass = computed(() => {
  const sizeMap = {
    'xs': 'w-3 h-3',
    'sm': 'w-4 h-4',
    'md': 'w-6 h-6',
    'lg': 'w-8 h-8',
    'xl': 'w-10 h-10',
    '2xl': 'w-12 h-12',
    '3xl': 'w-16 h-16'
  };
  return sizeMap[props.size as keyof typeof sizeMap] || sizeMap['md'];
});

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
