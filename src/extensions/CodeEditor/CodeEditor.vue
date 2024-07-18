<template>
  <NodeViewWrapper contenteditable="false" class="code-editor overflow-visible relative">
    <Panel :show-border="editor.isEditable">
      <template v-slot:content>
        <!-- 标签区域 -->
        <CodeTabs
          :items="items"
          :database="database"
          :onCreateTab="createTab"
          :onClickTab="activate"
          :onUpdateTitle="updateTitle"
          v-if="items.length > 1"
        >
        </CodeTabs>

        <!-- 编辑区域 -->
        <div class="relative" ref="codeDom">
          <Monaco
            contenteditable="true"
            :editable="editor.isEditable"
            :readOnly="!editor.isEditable"
            :content="content"
            :language="activatedItem.language"
            :runVisible="activatedItem.runVisible"
            :showRunButton="node.attrs.run == 1"
            :onContentChanged="handleContentChanged"
            :onRunnableChanged="handleRunnableChanged"
            :showLineNumbers="true"
            :uuid="monacoUuid"
            :on-language-changed="setLanguage"
          >
          </Monaco>

          <!-- 代码框，存储从文件系统读出的代码，然后放到Monaco编辑器中 -->
          <NodeViewContent ref="nodeViewContent" class="bg-green-50 hidden" />
        </div>
      </template>

      <template v-slot:operators>
        <!-- 代码块操作栏 -->
        <Toolbar
          v-if="editor.isEditable"
          :language="activatedItem.language"
          :content="content"
          :onNewTab="createTab"
          :on-set-not-runnable="setNotRunnable"
          :on-set-runnable="setRunnable"
          :on-set-language="setLanguage"
          :on-new-line="onNewLine"
          :on-delete="deleteTab"
        >
        </Toolbar>
      </template>
    </Panel>
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Monaco from './MonacoBox.vue'
import CodeTabs from './CodeTabs.vue'
import { Database } from './Entities/Database'
import {
  ref,
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated
} from 'vue'
import ClipboardJS from 'clipboard'
import { SmartLanguage } from './Entities/SmartLanguage'
import { CodeBlock } from './Entities/CodeBlock'
import Toolbar from './Toolbar.vue'
import Helper from '../Helper'
import { v4 as uuidv4 } from 'uuid'
import Panel from '../Panel.vue'

var clipboard = new ClipboardJS('.copy')
clipboard
  .on('success', function () {
    console.log('🍋 💼 CodeEditor: 已将源码复制到剪贴板')
  })
  .on('error', function (error) {
    console.log('复制失败')
    console.log(error)
  })

const props = defineProps(nodeViewProps)

let titlesDom = ref()
let database = computed<Database>(() => new Database(props.node.attrs.database))
let items = computed<CodeBlock[]>(() => database.value.items)

// CodeEditor 支持多标签，当前活跃的标签
// 默认从database读取，用户可改变
let activatedIndex = ref(database.value.activatedIndex)

let activatedItem = computed(() => items.value[activatedIndex.value])

// 传递给 Monaco 的代码内容
let content = computed(() => {
  return activatedItem.value.content
})
let monacoUuid = computed(() => {
  return props.node.attrs.uuid + activatedIndex.value
})

// 编辑器区域
let codeDom = ref(activatedItem.value.content)

function createTab(): void {
  console.log('createTab')
  props.updateAttributes({
    database: database.value.appendNewCodeBlock().toJSON()
  })
  activate(database.value.getLastIndex())
  // nextTick(focusToLastTitle)
}

function setRunnable() {
  props.updateAttributes({
    database: database.value.updateRunVisible(true).toJSON()
  })
}

function setNotRunnable() {
  props.updateAttributes({
    database: database.value.updateRunVisible(false).toJSON()
  })
}

function activate(index: number) {
  if (index == activatedIndex.value) return
  console.log('激活标签下标', index)
  activatedIndex.value = index
  props.updateAttributes({
    database: database.value.updateActivatedIndex(index).toJSON()
  })
}

function handleContentChanged(content: string) {
  // console.log("code editor found monaco content changed");

  // 异步更新，避免影响Monaco的响应速度
  setTimeout(() => {
    props.updateAttributes({
      code: content,
      database: database.value.updateContent(content).toJSON()
    })
  }, 5)
}

function handleRunnableChanged(runnable: boolean) {
  props.updateAttributes({
    database: database.value.updateRunVisible(runnable).toJSON()
  })
}

function deleteTab() {
  if (items.value.length == 1) return props.deleteNode()

  props.updateAttributes({
    database: database.value.deleteCodeBlock(activatedIndex.value).toJSON()
  })

  nextTick(focusToLastTitle)
  activate(database.value.getLastIndex())
}

function focusToLastTitle() {
  let titleTexts = titlesDom.value.querySelectorAll('.code-title')
  let lastTitle = titleTexts[titleTexts.length - 1]

  // 光标移到最后一个标签的内容的最后
  lastTitle.focus() // 聚焦到元素
  const range = document.createRange() // 创建一个 Range 对象
  range.selectNodeContents(lastTitle) // 设置 Range 对象的范围为元素的内容
  range.collapse(false) // 将 Range 对象的结束位置设置为最后一个字符的位置
  const selection = window.getSelection() // 获取 Selection 对象
  selection?.removeAllRanges() // 删除所有 Range 对象
  selection?.addRange(range) // 添加设置好的 Range 对象
}

function setLanguage(language: SmartLanguage) {
  props.updateAttributes({
    database: database.value.updateLanguage(language).toJSON()
  })
}

function updateTitle(title: string) {
  props.updateAttributes({
    database: database.value.updateTitle(title).toJSON()
  })
}

function onNewLine() {
  Helper.newLine(props)
}

onBeforeMount(() => {
  console.log('🍋 💼 CodeEditor: before mounted')
})

onMounted(() => {
  console.log('🍋 💼 CodeEditor: mounted, uuid = ', props.editor.options.injectNonce)

  // 如果是最后一个节点，在本节点后插入一个空的p，防止光标无法移动到下一个节点
  Helper.insertNewLineIfIsTheLastNode(props)
})

onBeforeUpdate(() => {
  console.log('🍋 💼 CodeEditor: before update')
})

onUpdated(() => {
  // 当 Tiptap 更新内容后，该组件不一定会被销毁，可能被 Vue 复用
  console.log('🍋 💼 CodeEditor: updated')
})

onBeforeUnmount(() => {
  console.log('🍋 💼 CodeEditor: before unmounted')
})

onUnmounted(() => {
  console.log('🍋 💼 CodeEditor: unmounted')
})
</script>
