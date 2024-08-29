<template>
  <div class="flex flex-col items-center relative w-full" id="index">
    <ToolBar v-if="app.isDebug" class="sticky z-50 top-1"></ToolBar>

    <!-- 初始化时的内容来源 -->
    <slot></slot>

    <Loading v-if="app.loading"></Loading>

    <TiptapEditor
      v-if="feature.editorVisible"
      :content="content"
      :editable="feature.editable"
      :tableEnable="feature.tableEnabled"
      :drawEnable="feature.drawEnabled"
      :drawLink="app.drawLink"
      :bubbleMenusEnable="feature.bubbleMenuVisible"
      :floatingMenusEnable="feature.floatingMenuVisible"
      :onUpdate="onUpdate"
      :onMessage="onMessage"
      :uuid="app.getCurrentDocUUID()"
    />

    <!-- 子节点 -->
    <div
      class="container flex justify-center px-4 pt-4 pb-24 mx-auto mt-0 dark:border-gray-700/30"
      :class="{ 'border-t': feature.editorVisible }"
      v-if="children.length > 0"
    >
      <NodeCardList :nodes="children"></NodeCardList>
    </div>

    <Message :message="message" type="tips" :uuid="uuid"></Message>
  </div>
</template>

<script setup lang="ts">
import ToolBar from './components/ToolBar.vue'
import { useAppStore } from './provider/AppStore'
import { useFeatureStore } from './provider/FeatureStore'
import Loading from './ui/Loading.vue'
import { computed, onMounted, ref } from 'vue'
import Message from './ui/Message.vue'
import URLHelper from './helper/URLHelper'
import { v4 as generateUUID } from 'uuid'
import AllApi from './api/AllApi'
import EditorDoc from './model/EditorDoc'
import NodeCardList from './ui/NodeCardList.vue'
import TiptapEditor from './components/TiptapEditor.vue'
import TreeNode from './model/TreeNode'

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
const content = computed(() => app.getContent())
window.api = new AllApi(feature, app)
const api = window.api
const children: TreeNode[] = []

observer.observe(targetNode, config)

onMounted(() => {
  app.drawLink = props.drawio
  feature.editable = !props.readonly

  setEditorContent()

  // 监听 URL 变化
  window.onpopstate = URLHelper.onURLChanged
})

function onMessage(m: string) {
  message.value = m
  uuid.value = generateUUID()
}

function onUpdate(doc: EditorDoc) {
  api.node.setDoc(doc)
}

function setEditorContent() {
  // let content = document.querySelector('juice-editor')!.innerHTML
  // api.node.setContent(content)

  app.loading = false
  app.setReady()

  // observer.disconnect()
  // targetNode.innerHTML = ''
  // observer.observe(targetNode, config)
}
</script>

<style>
@import './app.css';
@import 'monaco-editor/min/vs/editor/editor.main.css';
</style>
