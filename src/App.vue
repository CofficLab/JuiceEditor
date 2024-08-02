<template>
  <div class="w-full">
    <IndexPage></IndexPage>

    <!-- <dart-element></dart-element> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import IndexPage from './components/IndexPage.vue'
import { useAppStore } from './provider/AppStore'
import { useFeatureStore } from './provider/FeatureStore'
import setApi from './api/ApiSet'
// register('dart-element')

// import { defineCustomElement } from 'vue'
// import VueDarkModeSwitch from './components/DarkElement.ce.vue'

// // Register the custom element so that it can be used as <dark-mode-switch>.
// function register(tagName = 'dark-mode-switch') {
//   customElements.define(tagName, defineCustomElement(VueDarkModeSwitch))
// }

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
./api/api
