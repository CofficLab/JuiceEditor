<template>
  <div v-show="ready" class="w-full">
    <IndexPage></IndexPage>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import IndexPage from './components/IndexPage.vue'
import { useAppStore } from './stores/AppStore'
import { useFeatureStore } from './stores/FeatureStore'
import setApi from './entities/SetApi';

const ready = ref(false)
const feature = useFeatureStore()

onMounted(() => {
  ready.value = true

  // 将方法暴露到外部，swift 可以调用
  setApi(useAppStore(), feature)

  if (!feature.contextMenu) {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }
})
</script>
