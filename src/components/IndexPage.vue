<template>
  <div class="flex flex-col h-full w-full">
    <div v-if="loading" class="flex justify-center items-center h-full">
      <Loading></Loading>
    </div>

    <div v-else class="flex flex-col">
      <!-- 图书简介 -->
      <div v-if="node.isBook"
        class="rounded-2xl bg-base-200 m-12 p-4 container mx-auto flex flex-col gap-4 justify-center">
        <div class="flex flex-row gap-2">
          <IconBook class="w-24 h-24"></IconBook>
          <h1 class="text-5xl font-bold flex items-center" v-html="node.title"></h1>
        </div>
        <div class="flex flex-col gap-2 text-sm">
          <span>当前版本：1.0</span>
          <span>上次同步：{{ node.lastSyncedAt }}</span>
        </div>
      </div>

      <!-- 编辑器 -->
      <div>
        <TiptapEditor v-if="showEditor" :content="node.content" :onUpdate="onUpdate" />
      </div>

      <!-- 子节点 -->
      <div class="container mx-auto px-4 py-4 flex mt-24 justify-center border-t dark:border-gray-700/30" v-if="node.children.length > 0">
        <NodeCardList :nodes="node.children"></NodeCardList>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TiptapEditor from './TiptapEditor.vue'
import TreeNode from '../entities/TreeNode'
import NodeCardList from './NodeCardList.vue'
import { onMounted, ref } from 'vue'
import Loading from '../components/Loading.vue'
import IconBook from '../icons/IconBook.vue'

let isDebug = process.env.NODE_ENV === 'development'
let loading = ref(false)
let showEditor = ref(true)
let node = ref<TreeNode>(new TreeNode({}))

// 当页面内容发生变动时
function onUpdate(updatedNode: TreeNode) {
  console.log('IndexPage: onUpdate')
  node.value = updatedNode

  if (!('webkit' in window)) {
    return
  }

  console.log('调用 WebKit 以更新节点内容')
  setTimeout(() => {
    try {
      ; (window as any).webkit.messageHandlers.updateContent.postMessage({
        content: updatedNode.content,
        title: updatedNode.title,
        id: `${updatedNode.id}`,
        characterCount: `${updatedNode.characterCount}`,
        wordCount: `${updatedNode.wordCount}`
      })
    } catch (e) {
      console.log('更新内容失败', e)
    }
  }, 0)
}

onMounted(() => {
  // 将方法暴露到外部，swift 可以调用
  window.updater = {
    showEditor: () => (showEditor.value = true),
    hideEditor: () => (showEditor.value = false),

    updateNode: function (newNode: Object) {
      loading.value = true
      console.log('更新节点')

      try {
        node.value = new TreeNode(newNode)
      } catch (e) {
        console.log('执行 updateNode 失败', e)
      }

      loading.value = false
    }
  }

  console.log('调用 WebKit 以通知 Swift 页面加载完成')
  try {
    ; (window as any).webkit.messageHandlers.pageLoaded.postMessage({})
  } catch (e) {
    console.log('调用 WebKit 以通知 Swift 页面加载完成，失败', e)
  }
})
</script>
