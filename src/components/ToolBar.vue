<template>
  <div
    class="flex flex-row container mx-auto justify-end mt-4 sticky top-4 join z-50"
    v-if="featureStore.toolbarVisible"
  >
    <button
      class="btn btn-primary btn-xs join-item"
      @click="featureStore.enableEdit"
      v-if="!featureStore.editable"
    >
      编辑模式
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="featureStore.disableEdit"
      v-if="featureStore.editable"
    >
      只读模式
    </button>

    <button
      class="btn btn-primary btn-xs join-item"
      @click="featureStore.enableTable"
      v-if="!featureStore.tableEnabled"
    >
      开启 Table
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="featureStore.disableTable"
      v-if="featureStore.tableEnabled"
    >
      关闭 Table
    </button>

    <button
      class="btn btn-primary btn-xs join-item"
      @click="featureStore.enableDraw"
      v-if="!featureStore.drawEnabled"
    >
      开启 Draw
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="featureStore.disableDraw"
      v-if="featureStore.drawEnabled"
    >
      关闭 Draw
    </button>

    <button
      class="btn btn-primary btn-xs join-item"
      @click="featureStore.showEditor"
      v-if="!featureStore.editorVisible"
    >
      显示 Editor
    </button>
    <button
      class="btn btn-primary btn-xs join-item"
      @click="featureStore.hideEditor"
      v-if="featureStore.editorVisible"
    >
      隐藏 Editor
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useFeatureStore } from '../stores/FeatureStore'

const featureStore = useFeatureStore()
</script>
