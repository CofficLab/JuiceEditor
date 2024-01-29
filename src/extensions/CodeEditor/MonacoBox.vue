<template>
  <div>
    <div class="relative">
      <!-- 运行按钮 -->
      <button
        class="btn btn-square btn-ghost text-accent btn-xs absolute bottom-2 right-2 z-20"
        @click="handleRun"
        v-show="runVisible && language.runnable"
        contenteditable="false"
      >
        <template v-if="!runResultVisible">
          <span class="loading loading-spinner" v-if="running"></span>
          <PlayIcon v-else />
        </template>
        <CloseIcon v-else="runResultVisible" />
      </button>

      <!-- Monaco -->
      <!-- monaco有时候不能全部占满这个div，会在左侧或右侧留几个像素的padding -->
      <!-- 所以让这个div的背景色=monaco的背景色 -->
      <div ref="codeDom" class="relative z-10 bg-black" contenteditable="true"></div>
    </div>

    <!-- 展示运行结果 -->
    <div class="px-0">
      <pre
        ref="resultDom"
        v-show="runResultVisible && runVisible"
        class="result-dom border border-transparent border-y-green-900 m-0 rounded-none"
      ></pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref, onBeforeUnmount } from 'vue'
import MonacoBox from './MonacoBox'
import webkit from '../../entities/WebKit'
import PlayIcon from './Icons/Play.vue'
import CloseIcon from './Icons/Close.vue'
import { SmartLanguage, languages } from '../../entities/SmartLanguage'

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
    default: () => {
      console.log('MonacoBox: monaco content changed')
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
    default: () => {
      console.log('🍋 💼 MonacoBox: monaco language changed')
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

/**
 * 运行按钮相关的属性
 */
// 编程语言是否可运行
let running = ref(false)
let runResultVisible = ref(false)

/**
 * editor相关属性
 */
let codeDom = ref<HTMLDivElement>()
let resultDom = ref<HTMLDivElement>()
var editorBox: MonacoBox | null = null
let lan = ref(languages[0])

onMounted(() => {
  console.log('🍋 💼 MonacoBox: mounted')
  // console.log('🍋 💼 MonacoBox: mounted, content = ', props.content)

  // 编辑器
  MonacoBox.createEditor(editorBox!, {
    name: '主编辑器',
    uuid: props.uuid,
    content: props.content,
    target: codeDom.value!,
    language: props.language,
    readOnly: !props.editable,
    onCreated(monacoBox) {
      console.log('🍋 🗒️ MonacoBox: created')
      lan.value = monacoBox.getLanguage()
      editorBox = monacoBox

      // setTimeout(() => {
      //   // 去掉setTimeout则不能获取焦点，原因暂时不明
      //   // 如果内容为空，说明是新创建的，获取焦点
      //   if (props.content == '') {
      //     monacoBox.editor.focus()
      //   }
      // }, 0)
    },
    onContentChanged(monacoBox) {
      props.onContentChanged(monacoBox)
    },
    onLanguageChanged(editorBox) {
      console.log('🍋 💼 MonacoBox: onLanguageChanged ->', editorBox.getLanguage())
      lan.value = editorBox.getLanguage()
      props.onLanguageChanged(editorBox)
    }
  })
})

onBeforeUnmount(() => {
  console.log('🍋 💼 MonacoBox: before unmounted')
})

onUnmounted(() => {
  console.log('🍋 💼 MonacoBox: unmounted，销毁 Monaco')

  setTimeout(() => {
    editorBox!.editor.dispose()
  }, 1)
  MonacoBox.printCount()
})

watch(
  () => props.content,
  () => {
    console.log('🍋 💼 MonacoBox: 检测到 props.content 发生变化')
    editorBox!.setContent(props.content)
  }
)

watch(
  () => props.language,
  () => {
    console.log('🍋 💼 MonacoBox: 检测到 props.language 发生变化')
    editorBox!.setLanguage(props.language)
  }
)

/**
 * 处理页面点击事件
 */
let handleRun = () => {
  if (running.value) return

  // 收起结果
  if (runResultVisible.value) {
    runResultVisible.value = false
    running.value = false
    resultDom.value!.innerHTML = ''
    return
  }

  running.value = true

  setTimeout(() => {
    webkit.runCode(
      editorBox?.getContent() || '',
      props.language.getTitle() || languages[0].getTitle(),
      (result) => {
        resultDom.value!.innerHTML = result == '' ? '「程序没有输出」' : result
        runResultVisible.value = true
        running.value = false
      }
    )
  }, 5)
}
</script>
