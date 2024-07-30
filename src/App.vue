<template>
  <div class="w-full">
    <IndexPage></IndexPage>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import IndexPage from './components/IndexPage.vue'
import { useAppStore } from './provider/AppStore'
import { useFeatureStore } from './provider/FeatureStore'
import setApi from './config/api'

const feature = useFeatureStore()
const app = useAppStore()

onMounted(() => {
  // 将方法暴露到外部，swift 可以调用
  setApi(app, feature)

  app.setReady()

  // if (!feature.contextMenu) {
  //   document.addEventListener('contextmenu', event => event.preventDefault());
  // }
})
</script>
