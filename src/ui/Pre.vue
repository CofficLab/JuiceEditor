<template>
  <pre :id="id" class="px-4 py-2 m-0 text-sm border rounded-none border-green-900/40"></pre>
</template>

<script lang="ts" setup>
defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>
