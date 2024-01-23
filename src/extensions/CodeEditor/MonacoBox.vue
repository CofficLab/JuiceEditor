<template>
  <div>
    <div class="relative rounded-3xl">
      <!-- 运行按钮 -->
      <button
        class="btn btn-square btn-ghost text-accent btn-xs absolute bottom-2 right-2 z-20"
        @click="handleRun"
        v-show="runnable"
        contenteditable="false"
      >
        <template v-if="!runResultVisible">
          <span class="loading loading-spinner" v-if="running"></span>
          <PlayIcon v-else />
        </template>
        <CloseIcon v-else="runResultVisible" />
      </button>

      <div ref="codeDom" class="relative z-10 rounded-md" contenteditable="true"></div>
    </div>

    <!-- 展示运行结果 -->
    <div
      ref="resultDom"
      v-show="runResultVisible && runnable"
      class="result-dom border-2 border-transparent border-t-sky-900"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref, onBeforeUnmount } from 'vue'
import MonacoBox from './MonacoBox'
import webkit from '../../entities/WebKit'
import PlayIcon from './Icons/Play.vue'
import CloseIcon from './Icons/Close.vue'

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
  runnable: {
    type: Boolean,
    default: false
  },
  language: {
    type: String,
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
      console.log('MonacoBox: monaco language changed')
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
let runnable = ref(false)
let running = ref(false)
let runResultVisible = ref(false)

/**
 * editor相关属性
 */
let codeDom = ref<HTMLDivElement>()
let resultDom = ref<HTMLDivElement>()
let editorBox = ref<MonacoBox>()
let resultBox: MonacoBox
let lan = ref()

onMounted(() => {
  console.log('🍋 MonacoBox: mounted, uuid = ', props.uuid)

  // 编辑器
  MonacoBox.createEditor(editorBox.value!, {
    name: '主编辑器',
    uuid: props.uuid,
    content: props.content,
    target: codeDom.value!,
    language: props.language,
    readOnly: !props.editable,
    onCreated(monacoBox) {
      lan.value = monacoBox.getLanguage()
      runnable.value = monacoBox.getRunnable() && lan.value != 'plaintext'
      editorBox.value = monacoBox

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
    onRunnableChanged(v: boolean) {
      props.onRunnableChanged(v)
      runnable.value = v
    },
    onLanguageChanged(editorBox) {
      lan.value = editorBox.getLanguage()
      if (lan.value == 'plaintext') {
        runnable.value = false
      } else {
        runnable.value = editorBox.getRunnable()
      }

      props.onLanguageChanged(editorBox)
    }
  })

  // 展示运行结果的编辑器
  MonacoBox.createEditor(resultBox, {
    content: '',
    uuid: props.uuid + '-result',
    target: resultDom.value!,
    language: 'shell',
    runnable: props.runnable,
    name: '结果编辑器',
    onCreated: (monacoBox) => {
      resultBox = monacoBox
    }
  })
})

onBeforeUnmount(() => {
  console.log('MonacoBox: monaco component before unmounted')
})

onUnmounted(() => {
  console.log('MonacoBox: monaco component unmounted')
})

watch(
  () => props.content,
  () => {
    console.log('MonacoBox: 检测到 props.content 发生变化')
    editorBox.value!.setContent(props.content)
  }
)

watch(
  () => props.language,
  () => {
    console.log('MonacoBox: 检测到 props.language 发生变化')
    editorBox.value!.setLanguage(props.language)
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
    resultBox.setContent('')
    return
  }

  running.value = true

  setTimeout(() => {
    webkit.runCode(
      editorBox.value?.getContent() || '',
      editorBox.value?.getLanguage() || 'go',
      (result) => {
        resultBox.setContent(result == '' ? '「程序没有输出」' : result)
        runResultVisible.value = true
        running.value = false
      }
    )
  }, 5)
}
</script>
