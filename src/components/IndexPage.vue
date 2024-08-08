<template>
  <div class="relative flex flex-col w-full h-full overflow-scroll" id="index">
    <div class="flex flex-col">
      <!-- 编辑器 -->
      <TiptapEditor
        v-if="featureStore.editorVisible"
        :content="content"
        :editable="featureStore.editable"
        :tableEnable="featureStore.tableEnabled"
        :drawEnable="featureStore.drawEnabled"
        :drawLink="drawLink"
        :bubbleMenusEnable="featureStore.bubbleMenuVisible"
        :floatingMenusEnable="featureStore.floatingMenuVisible"
        :onUpdate="onUpdate"
        :uuid="uuid"
      />

      <!-- 子节点 -->
      <div
        class="container flex justify-center px-4 pt-4 pb-24 mx-auto mt-0 dark:border-gray-700/30"
        :class="{ 'border-t': shouldShowBorder }"
        v-if="children.length > 0"
      >
        <NodeCardList :nodes="children"></NodeCardList>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TiptapEditor from './editor/TiptapEditor.vue'
import NodeCardList from './NodeCardList.vue'
import { computed, nextTick, watch } from 'vue'
import { useFeatureStore } from '../provider/FeatureStore'
import TreeNode from '../model/TreeNode'

const featureStore = useFeatureStore()

const props = defineProps({
  uuid: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  drawLink: {
    type: String,
    default: ''
  },
  onUpdate: {
    type: Function,
    default: () => {}
  },
  children: {
    type: Array as () => TreeNode[],
    default: []
  }
})

const drawLink = computed(() => {
  return props.drawLink
})

const featureUpdatedAt = computed(() => {
  return featureStore.nonce
})

// 是否显示编辑器和子节点之间的横线
const shouldShowBorder = computed(() => {
  return featureStore.editorVisible
})

watch(drawLink, () => {
  if (!featureStore.editorVisible) {
    return
  }

  console.log('IndexPage: drawLink 变了，重新加载Tiptap，drawLink ->' + drawLink.value)

  featureStore.hideEditor()
  nextTick(() => {
    featureStore.showEditor()
  })
})

watch(featureUpdatedAt, () => {
  if (!featureStore.editorVisible) {
    return
  }

  console.log(
    'IndexPage: feature变了，重新加载Tiptap，featureUpdatedAt ->' + featureUpdatedAt.value
  )

  featureStore.hideEditor()
  nextTick(() => {
    featureStore.showEditor()
  })
})
</script>
