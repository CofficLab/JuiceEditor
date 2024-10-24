<template>
    <div data-type="button-group" :class="{
        'flex items-center border shadow-lg prose dark:prose-invert min-h-5 m-0 z-50': true,
        'flex-row': props.direction == 'horizontal',
        'flex-col': props.direction == 'vertical',
        [props.borderClass]: true,
        [props.backgroundClass]: true,
        'rounded-2xl': props.shape === 'rounded',
        'rounded-md': props.shape === 'rectangle'
    }">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    type: {
        type: String,
        default: 'gray'
    },
    borderClass: {
        type: String,
        required: false,
        default: 'border-gray-800'
    },
    backgroundClass: {
        type: String,
        required: true,
        default: 'bg-red-100/95 dark:bg-red-500/95'
    },
    shape: {
        type: String,
        default: 'rectangle',
        validator: (value: string) => {
            return ['rectangle', 'rounded'].includes(value)
        }
    },
    direction: {
        type: String,
        default: 'horizontal'
    }
})
</script>
