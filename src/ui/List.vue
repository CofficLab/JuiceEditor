<template>
  <div class="absolute top-0 w-full p-0 shadow -right-20 menu menu-xs bg-base-300">
    <li v-for="(item, index) in items" :key="index" class="hover:bg-green-300">
      <a @click="onclick(item)" class="no-underline">{{ item.getTitle() }}</a>
    </li>
  </div>
</template>

<script lang="ts" setup generic="T extends { getTitle: () => string }">
import { PropType } from 'vue'

defineProps({
  items: {
    type: Array as PropType<T[]>,
    required: true,
    validator: (value: T[]) => value.every(item => typeof item.getTitle === 'function')
  },
  onclick: {
    type: Function as PropType<(item: T) => void>,
    default: () => { }
  }
})
</script>
