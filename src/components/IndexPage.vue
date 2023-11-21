<template>
  <div class="flex flex-col h-full w-full">
    <!-- 开发模式操作栏 -->
    <div v-if="isDebug" class="flex flex-row container mx-auto justify-center my-4 gap-4">
      <button class="btn btn-primary" @click="setEditable">编辑模式</button>
      <button class="btn btn-primary" @click="setReadonly">只读模式</button>
    </div>

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
        <TiptapEditor v-if="showEditor" :content="node.content" :editable="editable" :onUpdate="onUpdate" />
      </div>

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
import TreeNode from '../entities/TreeNode'
import NodeCardList from './NodeCardList.vue'
import { onMounted, ref } from 'vue'
import Loading from '../components/Loading.vue'
import IconBook from '../icons/IconBook.vue'

const sampleImgSrc = 'data:image/png;base64,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'
const sampleNode = new TreeNode({
  content: `
    <h1>测试内容</h1>
    <p>下面是一张图</p>
    <img src="${sampleImgSrc}"></img>
    <pre><code>console.log("ABC")</code></pre>
    <h2>画图</h2>
    <draw src="${sampleImgSrc}"></draw>
    <h2>链接</h2>
    <a href="https://www.baidu.com">百度</a>与谷歌的竞争
  `
})

let isDebug = process.env.NODE_ENV === 'development'
let loading = ref(false)
let showEditor = ref(true)
let editable = ref(true)
let node = ref<TreeNode>(isDebug ? sampleNode : new TreeNode({}))

function setEditable() {
  editable.value = true
}

function setReadonly() {
  editable.value = false
}

// 当页面内容发生变动时
function onUpdate(updatedNode: TreeNode) {
  console.log('IndexPage: onUpdate')
  node.value.content = updatedNode.content
  node.value.title = updatedNode.title
  node.value.characterCount = updatedNode.characterCount
  node.value.wordCount = updatedNode.wordCount

  if (!('webkit' in window)) {
    return
  }

  console.log('调用 WebKit 以更新节点内容')
  setTimeout(() => {
    try {
      // 只能传字符、只能传普通object
      ; (window as any).webkit.messageHandlers.updateContent.postMessage({
        content: node.value.content,
        title: node.value.title,
        id: node.value.id,
        characterCount: `${node.value.characterCount}`,
        wordCount: `${node.value.wordCount}`
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
    enableEdit: () => (editable.value = true),
    disableEdit: () => (editable.value = false),

    updateNode: function (newNode: Object) {
      loading.value = true
      console.log('更新节点')

      try {
        node.value = new TreeNode(newNode)

        // 关闭画图
        document.dispatchEvent(new CustomEvent('close-draw'))
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
