<template>
  <div class="flex flex-col items-center">
    <!-- 操作栏 -->
    <ToolBar v-if="app.isDebug" class="top-1 sticky z-50"></ToolBar>

    <!-- 初始化时的内容来源 -->
    <slot></slot>

    <!-- loading -->
    <Loading v-if="app.loading"></Loading>

    <IndexPage
      v-else
      v-show="app.ready"
      :uuid="node.currentDocUUID"
      :content="content"
      :drawLink="app.drawLink"
      :onUpdate="app.updateDoc"
      :onMessage="onMessage"
    ></IndexPage>

    <!-- 提示信息 -->
    <Message :message="message" type="tips" :uuid="uuid"></Message>
  </div>
</template>

<script setup lang="ts">
import IndexPage from './components/IndexPage.vue'
import ToolBar from './components/ToolBar.vue'
import { useAppStore } from './provider/AppStore'
import { useFeatureStore } from './provider/FeatureStore'
import setApi from './api/ApiSet'
import Loading from './ui/Loading.vue'
import { computed, onMounted, ref } from 'vue'
import Message from './ui/Message.vue'
import URLHelper from './helper/URLHelper'
import { v4 as generateUUID } from 'uuid'

const props = defineProps({
  drawio: {
    type: String,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const targetNode = document.querySelector('juice-editor')!
const config = { childList: true, subtree: true, characterData: true }
const observer = new MutationObserver(setEditorContent)
const feature = useFeatureStore()
const app = useAppStore()
const message = ref('')
const uuid = ref('')
const node = computed(() => {
  return app.node
})
const content = computed(() => {
  return app.node.getCurrentDoc().content
})

observer.observe(targetNode, config)

onMounted(() => {
  app.drawLink = props.drawio
  feature.editable = !props.readonly

  // 将方法暴露到外部，swift 可以调用
  setApi(app, feature)

  setEditorContent()

  // 监听 URL 变化
  window.onpopstate = URLHelper.onURLChanged
})

function onMessage(m: string) {
  message.value = m
  uuid.value = generateUUID()
}

function setEditorContent() {
  if (app.isDebug == false) {
    let content = document.querySelector('juice-editor')!.innerHTML
    app.setCurrentNodeContent(content)
  }

  app.loading = false
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
