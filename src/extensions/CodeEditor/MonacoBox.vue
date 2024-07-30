<template>
  <div>
    <div class="relative">
      <!-- 运行按钮 -->
      <button
        class="absolute bottom-0 z-20 btn btn-square dark:hover:bg-gray-900/80 btn-ghost text-accent right-2"
        :class="{
          'btn-xs': lineCount <= 2,
          'btn-sm': lineCount > 2
        }"
        @click="onClickIcon"
        v-show="runVisible && language.runnable"
        contenteditable="false"
      >
        <template v-if="!runResultVisible">
          <span class="loading loading-spinner" v-if="running"></span>
          <PlayIcon v-else />
        </template>
        <CloseIcon v-else="runResultVisible" />
      </button>

      <!-- 语言 -->
      <div contenteditable="false" class="absolute top-0 right-0 z-50">
        <LanguageSelect
          :editable="editable"
          :language="language"
          :on-language-changed="onLanguageChanged"
        ></LanguageSelect>
      </div>

      <!-- Monaco -->
      <!-- monaco有时候不能全部占满这个div，会在左侧或右侧留几个像素的padding -->
      <!-- 所以让这个div的背景色=monaco的背景色 -->
      <div :id="domId" class="relative z-10 bg-black" contenteditable="true"></div>
    </div>

    <!-- 展示运行结果 -->
    <div class="px-0">
      <pre
        :id="resultId"
        v-show="runResultVisible && runVisible"
        class="px-4 py-2 m-0 text-sm border rounded-none border-green-900/40"
      ></pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref, onBeforeUnmount, computed } from 'vue'
import MonacoBox from './Entities/MonacoBox'
import webkit from '../../api/WebKit'
import PlayIcon from './Icons/Play.vue'
import CloseIcon from './Icons/Close.vue'
import { v4 as uuidv4 } from 'uuid'
import * as monaco from 'monaco-editor'
import { SmartLanguage, languages } from './Entities/SmartLanguage'
import LanguageSelect from './LanguageSelect.vue'

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
  editable: {
    type: Boolean,
    default: true
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
    default: (content: string) => {
      console.log('MonacoBox: monaco content changed', content)
    }
  },
  onRunnableChanged: {
    type: Function,
    default: () => {
      console.log('monaco runnable changed')
    }
  },
  onLanguageChanged: {
    type: Function,
    default: (language: SmartLanguage) => {
      console.log('🍋 💼 MonacoBox: monaco language changed', language)
    }
  },
  showLineNumbers: {
    type: Boolean,
    default: true
  },
  runner: {
    type: Function,
    default: () => {
      console.log('monaco runner')
    }
  },
  uuid: {
    type: String,
    default: ''
  }
})

// 一个页面可能有多个monaco编辑器，每个monaco编辑器都有一个uuid
const domId = uuidv4()
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
let lan = ref(languages[0])
var editor: monaco.editor.IStandaloneCodeEditor
var lineCount = ref(0)

function getCodeElement(): HTMLDivElement {
  return document.getElementById(domId)! as HTMLDivElement
}

function getResultElement(): HTMLElement {
  return document.getElementById(resultId)!
}

function stop() {
  console.log('🍋 💼 MonacoBox: stop')
  runResultVisible.value = false
  running.value = false
}

onMounted(() => {
  console.log('🍋 💼 MonacoBox: mounted')

  editor = MonacoBox.createEditor({
    content: props.content,
    target: getCodeElement(),
    language: props.language,
    readOnly: !props.editable,
    onCreated(editor) {
      console.log('🍋 🗒️ MonacoBox: created')
      lan.value = MonacoBox.getLanguage(editor)
      lineCount.value = editor.getModel()!.getLineCount()
      // console.log('lines', lineCount.value)

      // setTimeout(() => {
      //   // 去掉setTimeout则不能获取焦点，原因暂时不明
      //   // 如果内容为空，说明是新创建的，获取焦点
      //   if (props.content == '') {
      //     monacoBox.editor.focus()
      //   }
      // }, 0)
    },
    onContentChanged(editor: monaco.editor.IStandaloneCodeEditor) {
      props.onContentChanged(editor.getValue())
      lineCount.value = editor.getModel()!.getLineCount()
    },
    onLanguageChanged(language) {
      console.log('🍋 💼 MonacoBox: onLanguageChanged ->', language)
      lan.value = language
      props.onLanguageChanged(language)
    }
  })
})

onBeforeUnmount(() => {
  console.log('🍋 💼 MonacoBox: before unmounted')
})

onUnmounted(() => {
  console.log('🍋 💼 MonacoBox: unmounted，销毁 Monaco')

  setTimeout(() => {
    editor.dispose()
  }, 1)
})

watch(
  () => props.uuid,
  () => {
    if (editor.getValue() != props.content) {
      console.log('🍋 💼 MonacoBox: 检测到 props.uuid 发生变化，更新content')
      editor.setValue(props.content)
    } else {
      console.log('🍋 💼 MonacoBox: 检测到 props.uuid 发生变化，但与现有内容一致')
    }
  }
)

watch(
  () => props.language,
  () => {
    console.log('🍋 💼 MonacoBox: 检测到 props.language 发生变化')
    MonacoBox.setLanguage(editor, props.language)
  }
)

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
    let content = editor.getValue() || ''
    let language = props.language.getTitle() || languages[0].getTitle()
    webkit.runCode(content, language, (result) => {
      var output = ''
      if (result.length == 0) {
        output += '「程序没有输出」'
      } else {
        output += result
      }
      getResultElement().innerHTML = output
      runResultVisible.value = true
      running.value = false
    })
  }, 5)
}
</script>
