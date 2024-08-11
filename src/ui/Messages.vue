<template>
  <div class="flex flex-col h-full">
    <div v-if="messages.length > 0" class="flex flex-col gap-2">
      <template v-for="(message, index) in messages" :key="index">
        <div class="alert alert-info">
          <IconInfo></IconInfo>
          <span>{{ message }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconInfo from '../../ui/icons/IconInfo.vue'

defineProps({
  messages: {
    type: Array,
    required: true
  }
})
</script>
