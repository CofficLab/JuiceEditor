<template>
  <div :class="{
    'flex flex-row items-center border shadow-lg not-prose min-h-5 m-0': true,
    'border-green-800': props.type == 'gray',
    'border-blue-800': props.type == 'blue',
    [props.backgroundColor]: true,
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
  backgroundColor: {
    type: String,
    default: 'bg-slate-100/95'
  },
  shape: {
    type: String,
    default: 'rectangle',
    validator: (value: string) => {
      return ['rectangle', 'rounded'].includes(value)
    }
  }
})
</script>
