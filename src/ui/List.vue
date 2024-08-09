<template>
  <div class="absolute top-0 w-full p-0 shadow -right-20 menu menu-xs bg-base-300">
    <li v-for="(item, index) in items" :key="index" class="hover:bg-green-300">
      <a @click="onclick(item)" class="no-underline">{{ item.getTitle() }}</a>
    </li>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  items: {
    type: Array,
    required: true
  },
  onclick: {
    type: Function,
    default: (item: any) => {}
  }
})
</script>
