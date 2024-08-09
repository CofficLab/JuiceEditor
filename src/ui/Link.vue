<template>
  <a
    :href="href"
    class="p-1 prose no-underline break-all rounded-none hover:bg-slate-400/50 dark:prose-invert"
  >
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
