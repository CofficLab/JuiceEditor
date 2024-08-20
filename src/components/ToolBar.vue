<template>
  <ButtonBar>
    <Button @click="app.setCurrentNode(baseNode)">通用</Button>
    <Button @click="app.setCurrentNode(taskNode)">待办</Button>
    <Button @click="app.setCurrentNode(paragraphNode)">段落</Button>
    <Button @click="app.setCurrentNode(quoteNode)">引用</Button>
    <Button @click="app.setCurrentNode(bulletNode)">无序列表</Button>
    <Button @click="app.setCurrentNode(linkNode)">链接</Button>
    <Button @click="app.setCurrentNode(codeNode)">代码</Button>
    <Button @click="app.setCurrentNode(drawNode)">图片</Button>
    <Button @click="app.setCurrentNode(tableNode)">表格</Button>
    <Button @click="app.setCurrentNode(kbdNode)">Kbd</Button>
    <Button @click="app.setCurrentNode(bigNode)">超长</Button>
    <Button @click="app.setCurrentNode(liteNode)">小型</Button>
    <Button @click="app.setCurrentNode(bannerNode)">Banner</Button>
    <Button @click="app.setCurrentNode(childrenNode)">带子节点</Button>
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
import { useAppStore } from '../provider/AppStore'
import { useFeatureStore } from '../provider/FeatureStore'
import baseNode from '../samples/BaseNode'
import bulletNode from '../samples/BulletNode'
import linkNode from '../samples/LinkNode'
import codeNode from '../samples/CodeNode'
import drawNode from '../samples/DrawNode'
import paragraphNode from '../samples/ParagraphNode'
import tableNode from '../samples/TableNode'
import bigNode from '../samples/BigNode'
import liteNode from '../samples/LiteNode'
import taskNode from '../samples/TaskNode'
import bannerNode from '../samples/BannerNode'
import childrenNode from '../samples/ChildrenNode'
import Button from '../ui/Button.vue'
import ButtonBar from '../ui/ButtonBar.vue'
import quoteNode from '../samples/QuoteNode'
import kbdNode from '../samples/KbdNode'

const feature = useFeatureStore()
const app = useAppStore()
const w = window
</script>
