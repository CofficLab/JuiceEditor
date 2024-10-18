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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" :class="sizeClass" :stroke="colorClass">
        <path d="M3 4H21V6H3V4ZM5 19H19V21H5V19ZM3 14H21V16H3V14ZM5 9H19V11H5V9Z"></path>
    </svg>


</template>
