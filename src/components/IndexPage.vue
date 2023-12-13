<template>
  <div class="flex flex-col h-full w-full relative overflow-scroll">
    <!-- 操作栏 -->
    <div class="flex flex-row container mx-auto justify-end mt-4 sticky top-4 join">
      <button class="btn btn-primary btn-xs join-item" @click="appStore.enableEdit">编辑模式</button>
      <button class="btn btn-primary btn-xs join-item" @click="appStore.disableEdit">只读模式</button>
      <button class="btn btn-primary btn-xs join-item" @click="appStore.enableEdit">复制</button>
      <button class="btn btn-primary btn-xs join-item" @click="appStore.enableEdit">TOC</button>
    </div>

    <!-- loading -->
    <div v-if="appStore.loading" class="flex justify-center items-center h-full">
      <Loading></Loading>
    </div>

    <div v-else class="flex flex-col">
      <!-- 图书简介 -->
      <BookIntro :node="node" />

      <!-- 编辑器 -->
      <TiptapEditor v-if="appStore.editorVisible" :content="node.content" :editable="appStore.editable"
        :onUpdate="appStore.updateNode" />

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
import { computed, onMounted } from 'vue'
import Loading from '../components/Loading.vue'
import { useAppStore } from '../stores/AppStore'
import BookIntro from './BookIntro.vue'

const appStore = useAppStore()

const node = computed(() => {
  return appStore.node
})

onMounted(() => {
  appStore.setReady()
})
</script>
