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

    <div ref="monacoDom" class="hidden"></div>
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
import MonacoBox from './extensions/SmartPre/Entities/MonacoBox'
import { onMounted, ref } from 'vue'
import { SmartLanguage } from './extensions/SmartPre/Entities/SmartLanguage'

const monacoDom = ref(null as unknown as HTMLDivElement)

const props = defineProps({
  drawio: {
    type: String,
    required: true
  }
})

// 选择要观察的目标节点
const targetNode = document.querySelector('juice-editor')!

// 创建观察者选项
const config = { childList: true, subtree: true, characterData: true }

// 创建一个 MutationObserver 实例，并传入回调函数
const observer = new MutationObserver((mutationsList) => {
  setEditorContent()
})

// 开始观察目标节点
observer.observe(targetNode, config)

const feature = useFeatureStore()
const app = useAppStore()
const node = computed(() => {
  return app.node
})

onMounted(() => {
  app.drawLink = props.drawio

  // 将方法暴露到外部，swift 可以调用
  setApi(app, feature)

  setEditorContent()

  // if (!feature.contextMenu) {
  //   document.addEventListener('contextmenu', event => event.preventDefault());
  // }

  MonacoBox.createEditor({
    content: 'console.log("EEEE")',
    target: monacoDom.value,
    language: SmartLanguage.fromString('javascript')
  })
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
@import '../node_modules/monaco-editor/min/vs/editor/editor.main.css';
</style>
