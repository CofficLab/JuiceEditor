<template>
  <div v-show="ready" class="w-full">
    <IndexPage></IndexPage>
    <ContextMenu></ContextMenu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import IndexPage from './components/IndexPage.vue'
import ContextMenu from './components/ContextMenu.vue'
import { useAppStore } from './stores/AppStore'
import { useFeatureStore } from './stores/FeatureStore'

const appStore = useAppStore()
const featureStore = useFeatureStore()
const ready = ref(false)

onMounted(() => {
  ready.value = true

  // 将方法暴露到外部，swift 可以调用
  window.updater = {
    appStore: appStore,
    featureStore: featureStore
  }
})
</script>
