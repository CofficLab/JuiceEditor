<template>
  <div :class="{
    'flex flex-row items-center border shadow-lg not-prose min-h-10': true,
    'border-green-800 bg-slate-500/95':
      props.type == 'gray',
    'border-blue-800 bg-blue-500/95':
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
