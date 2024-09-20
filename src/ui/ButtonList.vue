<template>
  <div :class="{
    'flex flex-col items-center border shadow-lg not-prose': true,
    'border-green-800 bg-slate-500/20':
      props.type == 'gray',
    'border-blue-800 bg-blue-500/20':
      props.type == 'blue'
  }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: 'gray'
  }
})
</script>
