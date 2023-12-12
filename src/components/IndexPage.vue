<template>
  <div class="flex flex-col h-full w-full relative overflow-scroll">
    <!-- 操作栏 -->
    <div class="flex flex-row container mx-auto justify-end mt-4 sticky top-4 join">
      <button class="btn btn-primary btn-xs join-item" @click="setEditable">编辑模式</button>
      <button class="btn btn-primary btn-xs join-item" @click="setReadonly">只读模式</button>
      <button class="btn btn-primary btn-xs join-item" @click="setReadonly">复制</button>
      <button class="btn btn-primary btn-xs join-item" @click="setReadonly">TOC</button>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-full">
      <Loading></Loading>
    </div>

    <div v-else class="flex flex-col">
      <!-- 图书简介 -->
      <div
        v-if="node.isBook"
        class="rounded-2xl bg-base-200 m-12 p-4 container mx-auto flex flex-col gap-4 justify-center"
      >
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
        <TiptapEditor
          v-if="showEditor"
          :content="node.content"
          :editable="editable"
          :onUpdate="onUpdate"
        />
      </div>

      <!-- 子节点 -->
      <div
        class="container mx-auto px-4 py-4 flex mt-24 justify-center border-t dark:border-gray-700/30"
        v-if="node.children.length > 0"
      >
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
import Sample from '../entities/Sample'
import * as Y from 'yjs'

let isDebug = process.env.NODE_ENV === 'development'
let loading = ref(false)
let showEditor = ref(true)
let editable = ref(true)
let node = ref<TreeNode>(isDebug ? Sample.sampleNode : new TreeNode({}))

function setEditable() {
  editable.value = true
}

function setReadonly() {
  editable.value = false
}

// 当页面内容发生变动时
function onUpdate(updatedNode: TreeNode) {
  console.log('IndexPage: onUpdate', updatedNode, JSON.stringify(updatedNode.jsonContent))
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
      ;(window as any).webkit.messageHandlers.updateContent.postMessage({
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
    showAndEditable: () => {
      showEditor.value = true
      editable.value = true
    },

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
    ;(window as any).webkit.messageHandlers.pageLoaded.postMessage({})
  } catch (e) {
    console.log('调用 WebKit 以通知 Swift 页面加载完成，失败', e)
  }
})

const mergeContent = () => {
  let a =
    '{"type":"doc","content":[{"type":"heading","attrs":{"id":null,"level":1},"content":[{"type":"text","text":"测试内容"}]},{"type":"heading","attrs":{"id":null,"level":2},"content":[{"type":"text","text":"链接"}]}]}'
  let b =
    '{"type":"doc","content":[{"type":"heading","attrs":{"id":null,"level":1},"content":[{"type":"text","text":"测试内容"}]},{"type":"heading","attrs":{"id":null,"level":2},"content":[{"type":"text","text":"链接2"}]}]}'

  const ydoc = new Y.Doc()
  const ymap = ydoc.getMap()
  ymap.set('type', 'doc')
  ymap.set('content', JSON.parse(a).content)

  const ydocRemote = new Y.Doc()
  const ymapRemote = ydocRemote.getMap()
  ymapRemote.set('type', 'doc')
  ymapRemote.set('content', JSON.parse(b).content)

  const update = Y.encodeStateAsUpdateV2(ydocRemote)
  Y.applyUpdate(ydoc, update)

  console.log(ymap.toJSON())
}
</script>
