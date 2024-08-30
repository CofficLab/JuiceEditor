<template>
  <div
    :class="{
      'flex flex-row items-center border border-green-800 shadow-lg bg-slate-500/20 not-prose':
        props.type == 'gray',
      'flex flex-row items-center border border-blue-800 shadow-lg bg-blue-500/20 not-prose':
        props.type == 'blue'
    }"
  >
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
