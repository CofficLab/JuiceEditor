<template>
  <div
    v-if="node.isBook"
    class="rounded-2xl bg-base-200 m-12 p-4 container mx-auto flex flex-col gap-4 justify-center"
  >
    <div class="flex flex-row gap-2">
      <IconBook class="w-24 h-24"></IconBook>
      <h1 class="text-5xl font-bold flex items-center" v-html="node.title"></h1>
    </div>
    <div class="flex flex-col gap-2 text-sm">
      <span>当前版本：1.0</span>
      <span>上次同步：{{ node.lastSyncedAt }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconBook from './icons/IconBook.vue'

defineProps({
  node: {
    type: Object,
    required: true
  }
})
</script>
