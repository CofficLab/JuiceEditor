<template>
  <div class="flex flex-col items-center">
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
      :onUpdate="app.updateNode"
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
import { computed } from 'vue'
import { onMounted } from 'vue'

const props = defineProps({
  drawio: {
    type: String,
    required: true
  }
})

const targetNode = document.querySelector('juice-editor')!
const config = { childList: true, subtree: true, characterData: true }
const observer = new MutationObserver(setEditorContent)
const feature = useFeatureStore()
const app = useAppStore()
const node = computed(() => {
  return app.node
})

observer.observe(targetNode, config)

onMounted(() => {
  app.drawLink = props.drawio

  // 将方法暴露到外部，swift 可以调用
  setApi(app, feature)

  setEditorContent()

  // if (!feature.contextMenu) {
  //   document.addEventListener('contextmenu', event => event.preventDefault());
  // }
})

function setEditorContent() {
  let content = document.querySelector('juice-editor')!.innerHTML
  app.setCurrentNodeContent(content)
  app.setReady()

  observer.disconnect()
  targetNode.innerHTML = ''
  observer.observe(targetNode, config)
}
</script>

<style>
@import './app.css';
@import 'monaco-editor/min/vs/editor/editor.main.css';
</style>
