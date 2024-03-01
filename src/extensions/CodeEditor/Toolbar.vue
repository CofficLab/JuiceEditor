<template>
  <div class="join z-50">
    <button class="btn btn-sm join-item tooltip z-50" data-tip="添加标签" @click="onNewTab">
      <IconPlus></IconPlus>
    </button>
    <button class="btn btn-sm join-item tooltip" data-tip="关运行" @click="setNotRunnable">
      <Stop></Stop>
    </button>
    <button class="btn btn-sm join-item tooltip" data-tip="开运行" @click="setRunnable">
      <Play></Play>
    </button>
    <button
      class="tooltip copy btn btn-sm join-item"
      data-tip="复制代码"
      v-bind:data-clipboard-text="content"
      @click="onNewTab"
    >
      <Copy></Copy>
    </button>
    <button class="btn btn-sm join-item tooltip" data-tip="删除" @click="onDelete">
      <Delete></Delete>
    </button>
    <button class="btn btn-sm join-item tooltip" data-tip="插入空行" @click="onNewLine">
      <IconNewLine></IconNewLine>
    </button>
  </div>
</template>

<script lang="ts" setup>
import ClipboardJS from 'clipboard'
import { SmartLanguage } from './Entities/SmartLanguage'
import IconPlus from './Icons/Plus.vue'
import Delete from './Icons/Delete.vue'
import Copy from './Icons/Copy.vue'
import Play from './Icons/Play.vue'
import Stop from './Icons/Stop.vue'
import IconNewLine from './Icons/IconNewLine.vue'

var clipboard = new ClipboardJS('.copy')
clipboard
  .on('success', function () {
    console.log('🍋 💼 CodeEditor: 已将源码复制到剪贴板')
  })
  .on('error', function (error) {
    console.log('复制失败')
    console.log(error)
  })

const props = defineProps({
  language: {
    type: SmartLanguage,
    required: true,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  onNewTab: {
    type: Function,
    default: () => {}
  },
  onSetRunnable: {
    type: Function,
    default: () => {}
  },
  onSetNotRunnable: {
    type: Function,
    default: () => {}
  },
  onDelete: {
    type: Function,
    default: () => {}
  },
  onNewLine: {
    type: Function,
    default: () => {}
  }
})

function onDelete() {
  props.onDelete()
}

function onNewTab() {
  props.onNewTab()
}

function onNewLine() {
  props.onNewLine()
}

function setRunnable() {
  props.onSetRunnable()
}

function setNotRunnable() {
  props.onSetNotRunnable()
}
</script>
