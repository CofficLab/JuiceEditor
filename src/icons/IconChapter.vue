<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
    :class="class" v-if="!solid">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" :class="class" v-if="solid">
    <path fill="#0277bd"
      d="M42,37.75H6c-1.105,0-2-0.895-2-2V11c0-1.105,0.895-2,2-2h9.172c0.53,0,1.039,0.211,1.414,0.586	l2.121,2.121C18.895,11.895,19.149,12,19.414,12H42c1.105,0,2,0.895,2,2v21.75C44,36.855,43.105,37.75,42,37.75z" />
    <path fill="#4fc3f7"
      d="M42,39.75H6c-1.105,0-2-0.895-2-2V16c0-1.105,0.895-2,2-2h36c1.105,0,2,0.895,2,2v21.75	C44,38.855,43.105,39.75,42,39.75z" />
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  class: {
    type: String,
    default: "h-6 w-6",
  },
  solid: {
    type: Boolean,
    default: false,
  }
});
</script>
