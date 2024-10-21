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
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
</template>
