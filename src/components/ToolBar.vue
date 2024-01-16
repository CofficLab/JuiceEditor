<template>
  <div
    class="flex flex-row container mx-auto justify-center mt-4 sticky top-4 join z-50"
    v-if="feature.toolbarVisible"
  >
    <button class="btn btn-primary btn-xs join-item" @click="app.setCurrentNode(Sample.sampleNode)">
      通用文章
    </button>
    <button class="btn btn-primary btn-xs join-item" @click="app.setCurrentNode(Sample.drawNode)">
      画图文章
    </button>
    <button class="btn btn-primary btn-xs join-item" @click="app.setCurrentNode(Sample.tableNode)">
      表格文章
    </button>
    <button class="btn btn-primary btn-xs join-item" @click="app.setCurrentNode(Sample.bigNode)">
      超长文章
    </button>
    <button class="btn btn-primary btn-xs join-item" @click="app.setCurrentNode(Sample.liteNode)">
      小型文章
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="app.setCurrentNode(Sample.nodeWithChildren)"
    >
      带子节点文章
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="feature.enableEdit"
      v-if="!feature.editable"
    >
      编辑模式
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="feature.disableEdit"
      v-if="feature.editable"
    >
      只读模式
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="feature.enableTable"
      v-if="!feature.tableEnabled"
    >
      开启 Table
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="feature.disableTable"
      v-if="feature.tableEnabled"
    >
      关闭 Table
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="feature.enableDraw"
      v-if="!feature.drawEnabled"
    >
      开启 Draw
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="feature.disableDraw"
      v-if="feature.drawEnabled"
    >
      关闭 Draw
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="feature.showEditor"
      v-if="!feature.editorVisible"
    >
      显示 Editor
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="feature.hideEditor"
      v-if="feature.editorVisible"
    >
      隐藏 Editor
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '../stores/AppStore'
import { useFeatureStore } from '../stores/FeatureStore'
import Sample from '../entities/Sample'

const feature = useFeatureStore()
const app = useAppStore()
</script>
