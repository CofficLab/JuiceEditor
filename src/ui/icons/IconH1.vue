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
        :class="sizeClass">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501m4.501-8.627 2.25-1.5v10.126m0 0h-2.25m2.25 0h2.25" />
    </svg>

</template>
