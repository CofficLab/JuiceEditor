<template>
  <div v-show="ready" class="w-full">
    <IndexPage></IndexPage>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import IndexPage from './components/IndexPage.vue'

const ready = ref(false)

onMounted(() => {
  ready.value = true
})
</script>
