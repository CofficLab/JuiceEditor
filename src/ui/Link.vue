<template>
  <a :href="href" class="break-all no-underline rounded-none p-1 hover:bg-slate-400/50">
    <slot></slot>
  </a>
</template>

<script lang="ts" setup>
defineProps({
  href: {
    type: String,
    default: ''
  }
})
</script>
