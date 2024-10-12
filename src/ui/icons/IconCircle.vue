<template>
    <div :class="[sizeClass, colorClass, 'rounded-full']"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    size: {
        type: String,
        default: 'md',
        validator: (value: string) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(value)
    },
    color: {
        type: String,
        default: 'primary',
        validator: (value: string) => ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
    }
});

const sizeClass = computed(() => {
    const sizeMap = {
        'xs': 'w-3 h-3',
        'sm': 'w-4 h-4',
        'md': 'w-5 h-5',
        'lg': 'w-6 h-6',
        'xl': 'w-8 h-8',
        '2xl': 'w-10 h-10',
        '3xl': 'w-12 h-12'
    };
    return sizeMap[props.size as keyof typeof sizeMap] || sizeMap['md'];
});

const colorClass = computed(() => {
    const colorMap = {
        'primary': 'bg-blue-500',
        'secondary': 'bg-purple-500',
        'success': 'bg-green-500',
        'warning': 'bg-yellow-500',
        'danger': 'bg-red-500'
    };
    return colorMap[props.color as keyof typeof colorMap] || colorMap['primary'];
});
</script>
