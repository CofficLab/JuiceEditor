<template>
  <ButtonBar>
    <Button
      v-for="sample in allSamples"
      :key="sample.node.uuid"
      @click="w.api.node.setNodeAndDocs(sample.node, [sample.doc])"
      >{{ sample.node.title }}</Button
    >
    <Button @click="feature.enableEdit" v-if="!feature.editable">编辑模式</Button>
    <Button @click="feature.disableEdit" v-if="feature.editable">只读模式</Button>
    <Button @click="w.api.event.toggleToc()">TOC</Button>
    <Button @click="feature.enableTable" v-if="!feature.tableEnabled">开启 Table</Button>
    <Button @click="feature.disableTable" v-if="feature.tableEnabled">关闭 Table</Button>
    <Button @click="feature.enableDraw" v-if="!feature.drawEnabled">开启 Draw</Button>
    <Button @click="feature.disableDraw" v-if="feature.drawEnabled">关闭 Draw</Button>
    <Button @click="feature.showEditor" v-if="!feature.editorVisible">显示 Editor</Button>
    <Button @click="feature.hideEditor" v-if="feature.editorVisible">隐藏 Editor</Button>
  </ButtonBar>
</template>

<script lang="ts" setup>
import { useFeatureStore } from '../provider/FeatureStore'
import allSamples from '../samples/AllSamples'
import Button from '../ui/Button.vue'
import ButtonBar from '../ui/ButtonBar.vue'

const feature = useFeatureStore()
const w = window
</script>
