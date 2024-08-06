<template>
  <div class="flex flex-col">
    <!-- 操作栏 -->
    <ToolBar v-if="app.isDebug"></ToolBar>

    <!-- 初始化时的内容来源 -->
    <slot></slot>

    <!-- loading -->
    <Loading v-if="app.loading"></Loading>

    <IndexPage
      v-else
      v-show="app.ready"
      :uuid="node.uuid"
      :content="node.content"
      :drawLink="app.drawLink"
      :monacoLink="props.monaco"
      :onUpdated="app.updateNode"
    ></IndexPage>
  </div>
</template>

<script setup lang="ts">
import IndexPage from './components/IndexPage.vue'
import ToolBar from './components/ToolBar.vue'
import { useAppStore } from './provider/AppStore'
import { useFeatureStore } from './provider/FeatureStore'
import setApi from './api/ApiSet'
import Loading from './ui/Loading.vue'
import { computed, onMounted } from 'vue'
import './app.css'

const props = defineProps({
  monaco: {
    type: String,
    required: true
  }
})

const feature = useFeatureStore()
const app = useAppStore()
const node = computed(() => {
  return app.node
})

onMounted(() => {
  console.log('Mounted')

  console.log(props)

  app.monacoLink = props.monaco

  // 将方法暴露到外部，swift 可以调用
  setApi(app, feature)

  let content = document.querySelector('juice-editor')!.innerHTML
  app.setCurrentNodeContent(content)
  app.setReady()
  document.querySelector('juice-editor')!.innerHTML = ''

  // if (!feature.contextMenu) {
  //   document.addEventListener('contextmenu', event => event.preventDefault());
  // }
})
</script>

<style>
@import './app.css';
</style>
