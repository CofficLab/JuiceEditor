<template>
  <NodeViewWrapper
    contenteditable="false"
    class="code-editor my-4 overflow-visible rounded relative border-0 border-yellow-600"
  >
    <CodeTabs
      :items="items"
      :database="database"
      :onCreateTab="createTab"
      :onClickTab="activate"
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
        :runnable="activatedItem.runnable"
        :showRunButton="node.attrs.run == 1"
        :onContentChanged="handleContentChanged"
        :onRunnableChanged="handleRunnableChanged"
        :showLineNumbers="true"
        :uuid="node.attrs.uuid"
      >
      </Monaco>

      <!-- 代码框，存储从文件系统读出的代码，然后放到Monaco编辑器中 -->
      <NodeViewContent ref="nodeViewContent" class="hidden" />

      <!-- 代码块操作栏 -->
      <div class="operation-bar" v-if="editor.isEditable">
        <!-- 语言按钮 -->
        <div class="dropdown dropdown-hover dropdown-bottom dropdown-end">
          <label tabindex="0">
            {{ activatedItem.language }}
          </label>
          <ul class="menu z-50">
            <li v-for="(item, index) in languages" :key="index">
              <a @click="setLanguage(item)">{{ item }}</a>
            </li>
          </ul>
        </div>
        <!-- 菜单按钮 -->
        <div class="dropdown dropdown-hover dropdown-bottom dropdown-end">
          <label tabindex="0">
            <Setting></Setting>
          </label>
          <ul class="menu z-50">
            <li>
              <a @click="createTab">新标签</a>
            </li>
            <li>
              <a class="copy" v-bind:data-clipboard-text="codeForCopy">复制代码 </a>
            </li>
            <li>
              <a @click="handleDelete">删除</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Monaco from './MonacoBox.vue'
import CodeTabs from './CodeTabs.vue'
import { Database, CodeBlock } from './Database'
import { ref, computed, nextTick, onMounted } from 'vue'
import MonacoBox from './MonacoBox'
import Setting from './Icons/Setting.vue'
import ClipboardJS from 'clipboard'

var clipboard = new ClipboardJS('.copy')
clipboard
  .on('success', function () {
    console.log('已将源码复制到剪贴板')
  })
  .on('error', function (error) {
    console.log('复制失败')
    console.log(error)
  })

const props = defineProps(nodeViewProps)

const languages = [
  'plaintext',
  'javascript',
  'typescript',
  'java',
  'html',
  'go',
  'php',
  'python',
  'shell',
  'swift'
]

// 复制按钮相关的属性
let codeForCopy = ref('test code')

let titlesDom = ref()
let database = computed<Database>(() => new Database(props.node.attrs.database))
let items = computed<CodeBlock[]>(() => database.value.items)
let activatedIndex = computed(() => database.value.activatedIndex)
let activatedItem = computed(() => items.value[activatedIndex.value])
let content = ref(activatedItem.value.content)
let codeDom = ref(activatedItem.value.content)
// 是否是整个editor.state.doc.content的最后一个node
let isTheLastNode = computed(
  () => props.node.nodeSize + props.getPos() == props.editor.state.doc.content.size
)

onMounted(() => {
  // 如果是最后一个节点，在本节点后插入一个空的p，防止光标无法移动到下一个节点
  if (isTheLastNode.value) {
    let tail = props.editor.state.doc.content.size
    props.editor.commands.insertContentAt(tail, '<p></p>', {
      updateSelection: false,
      parseOptions: {
        preserveWhitespace: 'full'
      }
    })
  }
})

function createTab(): void {
  props.updateAttributes({
    database: database.value.appendNewCodeBlock().toJSON()
  })
  activate(database.value.getLastIndex())
  // nextTick(focusToLastTitle)
}

function activate(index: number) {
  if (index == activatedIndex.value) return
  console.log('激活标签下标', index)
  props.updateAttributes({
    database: database.value.updateActivatedIndex(index).toJSON()
  })
  content.value = items.value[index].content
}

function handleContentChanged(editorBox: MonacoBox) {
  // console.log("code editor found monaco content changed");

  // 异步更新，避免影响Monaco的响应速度
  setTimeout(() => {
    props.updateAttributes({
      code: editorBox.getContent(),
      database: database.value.updateContent(editorBox.getContent()).toJSON()
    })
  }, 5)
}

function handleRunnableChanged(runnable: boolean) {
  props.updateAttributes({
    database: database.value.updateRunnable(runnable).toJSON()
  })
}

function handleDelete() {
  if (items.value.length == 1) return props.deleteNode()

  props.updateAttributes({
    database: database.value.deleteCodeBlock(activatedIndex.value).toJSON()
  })

  nextTick(focusToLastTitle)
  activate(database.value.getLastIndex())
}

function handleUpdateTitle(e: { target: any }) {
  props.updateAttributes({
    database: database.value.updateTitle(e.target!.innerText).toJSON()
  })
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

function setLanguage(language: string) {
  props.updateAttributes({
    database: database.value.updateLanguage(language).toJSON()
  })
}
</script>

<style lang="postcss" scoped>
ul.menu {
  @apply p-0 bg-base-200 w-24 mt-0 dropdown-content border-0 border-red-950 !important;

  li {
    @apply m-0 p-0 rounded-none !important;

    a {
      @apply no-underline rounded-none text-xs;
    }
  }
}

.operation-bar {
  @apply bg-black/80 flex flex-row justify-end rounded-b-xl;

  .dropdown label {
    @apply btn hover:bg-gray-600 font-normal btn-sm p-0 px-2 m-0 btn-ghost text-white rounded-none rounded-br-xl;
  }
}
</style>
