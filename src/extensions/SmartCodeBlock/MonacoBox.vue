<template>
  <!-- MonacoBox -->
  <div>
    <div class="relative">
      <!-- 运行按钮 -->
      <button class="absolute bottom-0 z-20 btn btn-square dark:hover:bg-gray-900/80 btn-ghost text-accent right-2"
        :class="{
          'btn-xs': lineCount <= 2,
          'btn-sm': lineCount > 2
        }" @click="onClickIcon" v-show="runVisible && language.runnable" contenteditable="false">
        <template v-if="!runResultVisible">
          <span class="loading loading-spinner" v-if="running"></span>
          <RiPlayCircleFill v-else />
        </template>
        <RiCloseCircleFill v-else="runResultVisible" />
      </button>

      <!-- Monaco -->
      <MonacoEditor :content="props.content" :language="props.language.key" />
    </div>

    <!-- 展示运行结果 -->
    <div class="px-0">
      <Pre :id="resultId" v-show="runResultVisible && runVisible"></Pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MonacoEditor from './MonacoEditor.vue'
import Pre from '../../ui/Pre.vue'
import { v4 as uuidv4 } from 'uuid'
import { SmartLanguage, languages } from './SmartLanguage'
import { RiCloseCircleFill, RiPlayCircleFill } from '@remixicon/vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  // 如果为0，则自动判断；如果大于0，则固定高度
  height: {
    type: Number,
    default: 0
  },
  // 用户配置的运行按钮是否可见
  runVisible: {
    type: Boolean,
    default: false
  },
  language: {
    type: SmartLanguage,
    default: ''
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  showRunButton: {
    type: Boolean,
    default: false
  },
  onContentChanged: {
    type: Function,
    default: (content: string) => { }
  },
  onRunnableChanged: {
    type: Function,
    default: () => { }
  },
  onLanguageChanged: {
    type: Function,
    default: (language: SmartLanguage) => { }
  },
  showLineNumbers: {
    type: Boolean,
    default: true
  },
  runner: {
    type: Function,
    default: () => { }
  },
  uuid: {
    type: String,
    default: ''
  }
})

// 一个页面可能有多个monaco编辑器，每个monaco编辑器都有一个uuid
const domId = 'monaco-dom-' + uuidv4()
const resultId = 'result-' + domId

/**
 * 运行按钮相关的属性
 */
// 编程语言是否可运行
let running = ref(false)
let runResultVisible = ref(false)

/**
 * editor相关属性
 */
var lineCount = ref(0)

function getResultElement(): HTMLElement {
  return document.getElementById(resultId)!
}

function stop() {
  runResultVisible.value = false
  running.value = false
}

/**
 * 处理页面点击事件
 */
let onClickIcon = () => {
  if (running.value) {
    return stop()
  }

  // 收起结果
  if (runResultVisible.value) {
    runResultVisible.value = false
    running.value = false
    getResultElement().innerHTML = ''
    return
  }

  running.value = true

  setTimeout(() => {
    // let content = editor.getValue() || ''
    // let language = props.language.getTitle() || languages[0].getTitle()
    // webkit.runCode(content, language, (result) => {
    //   var output = ''
    //   if (result.length == 0) {
    //     output += '「程序没有输出」'
    //   } else {
    //     output += result
    //   }
    //   getResultElement().innerHTML = output
    //   runResultVisible.value = true
    //   running.value = false
    // })
  }, 5)
}
</script>
