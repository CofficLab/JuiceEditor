<template>
  <div class="flex flex-col h-full w-full relative overflow-scroll">
    <!-- 操作栏 -->
    <div class="flex flex-row container mx-auto justify-end mt-4 sticky top-4 join" v-if="featureStore.toolbarVisible">
      <button class="btn btn-primary btn-xs join-item" @click="featureStore.enableEdit"
        v-if="!featureStore.editable">编辑模式</button>
      <button class="btn btn-primary btn-xs join-item" @click="featureStore.disableEdit"
        v-if="featureStore.editable">只读模式</button>

      <button class="btn btn-primary btn-xs join-item" @click="featureStore.enableTable"
        v-if="!featureStore.tableEnabled">开启 Table</button>
      <button class="btn btn-primary btn-xs join-item" @click="featureStore.disableTable"
        v-if="featureStore.tableEnabled">关闭 Table</button>

      <button class="btn btn-primary btn-xs join-item" @click="featureStore.enableDraw"
        v-if="!featureStore.drawEnabled">开启 Draw</button>
      <button class="btn btn-primary btn-xs join-item" @click="featureStore.disableDraw"
        v-if="featureStore.drawEnabled">关闭 Draw</button>

        <button class="btn btn-primary btn-xs join-item" @click="featureStore.showEditor"
          v-if="!featureStore.editorVisible">显示 Editor</button>
        <button class="btn btn-primary btn-xs join-item" @click="featureStore.hideEditor"
          v-if="featureStore.editorVisible">隐藏 Editor</button>
    </div>

    <!-- loading -->
    <div v-if="appStore.loading" class="flex justify-center items-center h-full">
      <Loading></Loading>
    </div>

    <div v-else class="flex flex-col">
      <!-- 图书简介 -->
      <BookIntro :node="node" />

      <!-- 编辑器 -->
      <TiptapEditor v-if="featureStore.editorVisible" :content="node.content" :editable="featureStore.editable"
        :tableEnable="featureStore.tableEnabled" :drawEnable="featureStore.drawEnabled" :onUpdate="appStore.updateNode" />

      <!-- 子节点 -->
      <div class="container mx-auto px-4 py-4 flex mt-24 justify-center border-t dark:border-gray-700/30"
        v-if="node.children.length > 0">
        <NodeCardList :nodes="node.children"></NodeCardList>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TiptapEditor from './TiptapEditor.vue'
import NodeCardList from './NodeCardList.vue'
import { computed, nextTick, onMounted, watch } from 'vue'
import Loading from '../components/Loading.vue'
import { useAppStore } from '../stores/AppStore'
import BookIntro from './BookIntro.vue'
import { useFeatureStore } from '../stores/FeatureStore'

const appStore = useAppStore()
const featureStore = useFeatureStore()

const node = computed(() => {
  return appStore.node
})

const featureUpdatedAt = computed(() => {
  return featureStore.updatedAt
})

watch(featureUpdatedAt, () => {
  console.log('featureUpdatedAt: ' + featureUpdatedAt.value)

  if (!featureStore.editorVisible) {
    return
  }

  featureStore.hideEditor()
  nextTick(() => {
    featureStore.showEditor()
  })
})

onMounted(() => {
  appStore.setReady()
})
</script>
