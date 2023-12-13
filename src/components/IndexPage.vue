<template>
  <div class="flex flex-col h-full w-full relative overflow-scroll">
    <!-- 操作栏 -->
    <div class="flex flex-row container mx-auto justify-end mt-4 sticky top-4 join">
      <button class="btn btn-primary btn-xs join-item" @click="appStore.enableEdit">编辑模式</button>
      <button class="btn btn-primary btn-xs join-item" @click="appStore.disableEdit">只读模式</button>
      <button class="btn btn-primary btn-xs join-item" @click="appStore.enableEdit">复制</button>
      <button class="btn btn-primary btn-xs join-item" @click="appStore.enableEdit">TOC</button>
    </div>

    <div v-if="appStore.loading" class="flex justify-center items-center h-full">
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
          v-if="appStore.editorVisible"
          :content="node.content"
          :editable="appStore.editable"
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
import { computed, onMounted } from 'vue'
import Loading from '../components/Loading.vue'
import IconBook from '../icons/IconBook.vue'
import { useAppStore } from '../stores/AppStore'
import * as Y from 'yjs'

const appStore = useAppStore()

const node = computed(() => {
  return appStore.node
})

// 当页面内容发生变动时
function onUpdate(updatedNode: TreeNode) {
  console.log('IndexPage: onUpdate', updatedNode, JSON.stringify(updatedNode.jsonContent))
  appStore.updateNode(updatedNode)
}

onMounted(() => {
  appStore.setReady()
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
