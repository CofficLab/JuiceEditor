<template>
  <div>
    <div class="relative rounded-3xl">
      <!-- 运行按钮 -->
      <!-- <button
        contenteditable="false"
        class="btn-sm btn absolute bottom-8 right-2 z-20 transition-none"
        :class="{ loading: running }"
        @click="handleRun"
        v-html="runTitle"
        v-show="runnable"
      ></button> -->

      <div id="xxx" ref="codeDom" class="relative z-10 rounded-md" contenteditable="true"></div>
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
import { computed, onMounted, onUnmounted, watch, ref } from 'vue'
import MonacoBox from './MonacoBox'

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
      console.log('monaco content changed')
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
      console.log('monaco language changed')
    }
  },
  showLineNumbers: {
    type: Boolean,
    default: true
  }
})

/**
 * 运行按钮相关的属性
 */
let runnable = ref(false)
let running = ref(false)
let runResultVisible = ref(false)
let runTitle = computed(() => (running.value ? '运行中' : runResultVisible.value ? '收起' : '运行'))

/**
 * editor相关属性
 */
let codeDom = ref<HTMLDivElement>()
let resultDom = ref<HTMLDivElement>()
let editorBox = ref<MonacoBox>()
let resultBox: MonacoBox
let lan = ref()

onMounted(() => {
  // 编辑器
  MonacoBox.createEditor(editorBox.value!, {
    name: '主编辑器',
    content: props.content,
    target: codeDom.value!,
    language: props.language,
    onCreated(monacoBox) {
      lan.value = monacoBox.getLanguage()
      runnable.value = monacoBox.getRunnable()
      editorBox.value = monacoBox

      setTimeout(() => {
        // 去掉setTimeout则不能获取焦点，原因暂时不明
        // 如果内容为空，说明是新创建的，获取焦点
        if (props.content == '') {
          monacoBox.editor.focus()
        }
      }, 0)
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
      props.onLanguageChanged(editorBox)
    }
  })

  // console.log(editorBox.value);

  // 展示运行结果的编辑器
  MonacoBox.createEditor(resultBox, {
    content: '',
    target: resultDom.value!,
    language: props.language,
    runnable: props.runnable,
    name: '结果编辑器',
    onCreated: (monacoBox) => {
      resultBox = monacoBox
    }
  })
})

onUnmounted(() => {
  console.log('monaco component unmounted')
})

watch(
  () => props.content,
  () => {
    console.log('monaco 检测到 props.content 发生变化')
    editorBox.value!.setContent(props.content)
  }
)

watch(
  () => props.language,
  () => {
    console.log('monaco 检测到 props.language 发生变化')
    editorBox.value!.setLanguage(props.language)
  }
)

/**
 * 处理页面点击事件
 */
let handleToggleRun = () => {
  editorBox.value!.toggleRunnable()
  if (!editorBox.value!.runnable) runResultVisible.value = false
}
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

  // setTimeout(() => {
  //   let result = Preload.ipc.sendSync("run", editorBox.value?.getContent(), editorBox.value?.getLanguage());
  //   resultBox.setContent(result == "" ? "「程序没有输出」" : result);
  //   // console.log("运行结果", result);
  //   running.value = false;
  //   runResultVisible.value = true;
  // }, 500);
}
</script>
