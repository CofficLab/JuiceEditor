<template>
  <svg class="umo-icon" aria-hidden="true" :width="size" :height="size">
    <use :xlink:href="`#icon-${props.name}`" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,

  },
  size: {
    type: String,
    default: '1em',
  },
  color: {
    type: String,
    default: 'currentcolor',
  },
})
</script>

<style lang="less">
.umo-icon {
  display: flex;
}
</style>
