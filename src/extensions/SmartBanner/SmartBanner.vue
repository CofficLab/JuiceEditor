<template>
  <node-view-wrapper>
    <div class="dropdown dropdown-open dropdown-left">
      <div tabindex="0" role="button" class="">
        <!-- 内容 -->
        <div class="flex flex-row gap-2 rounded-xl p-3" v-bind:class="[
          { 'border-yellow-500/80 ring-1 ring-orange-600': selected },
          { 'border-0 ring-1': !selected },
          { 'bg-gradient-to-l from-cyan-800/50': props.node.attrs.color == 'cyan' },
          { 'bg-gradient-to-l from-blue-800/50': props.node.attrs.color == 'blue' },
          { 'bg-gradient-to-l from-yellow-800/50': props.node.attrs.color == 'yellow' },
          { 'bg-gradient-to-l from-red-800/50': props.node.attrs.color == 'red' },
          { 'bg-gradient-to-l from-green-800/50': props.node.attrs.color == 'green' }
        ]" @click="onClick">
          <div class="flex items-center justify-between">
            <Info v-if="props.node.attrs.type == 'info'" class="w-5 h-6"></Info>
            <Question v-if="props.node.attrs.type == 'question'" class="w-5 h-6"></Question>
          </div>
          <node-view-content class="border border-none px-4 dark:border-cyan-800" />
        </div>
      </div>

      <!-- 操作栏 -->
      <div tabindex="0" class="p-2 dropdown-content z-[1]" v-show="selected" contenteditable="false">
        <div class="flex flex-col shadow-2xl ring-1 ring-orange-900/30 rounded-xl">
          <div class="flex flex-row">
            <div class="join join-vertical rounded-none rounded-tl-xl">
              <button class="btn btn-sm join-item" @click="setStyleToCyan">
                <Info class="w-5 h-6 text-cyan-500"></Info>
              </button>
              <button class="btn btn-sm join-item" @click="setStyleToBlue">
                <Info class="w-5 h-6 text-blue-500"></Info>
              </button>
              <button class="btn btn-sm join-item" @click="setStyleToYellow">
                <Info class="w-5 h-6 text-yellow-500"></Info>
              </button>
              <button class="btn btn-sm join-item" @click="setStyleToRed">
                <Info class="w-5 h-6 text-red-500"></Info>
              </button>
              <button class="btn btn-sm join-item" @click="setStyleToGreen">
                <Info class="w-5 h-6 text-green-500"></Info>
              </button>
            </div>
            <div class="join join-vertical rounded-none rounded-tr-xl">
              <button class="btn btn-sm join-item" @click="setStyleToCyanQuestion">
                <Question class="w-5 h-6 text-cyan-500"></Question>
              </button>
              <button class="btn btn-sm join-item" @click="setStyleToBlueQuestion">
                <Question class="w-5 h-6 text-blue-500"></Question>
              </button>
              <button class="btn btn-sm join-item" @click="setStyleToYellowQuestion">
                <Question class="w-5 h-6 text-yellow-500"></Question>
              </button>
              <button class="btn btn-sm join-item" @click="setStyleToRedQuestion">
                <Question class="w-5 h-6 text-red-500"></Question>
              </button>
              <button class="btn btn-sm join-item" @click="setStyleToGreenQuestion">
                <Question class="w-5 h-6 text-green-500"></Question>
              </button>
            </div>
          </div>
          <div class="w-full flex">
            <button class="btn btn-sm join-item w-full rounded-t-none rounded-b-xl" @click="deleteNode">
                <IconDelete class="w-5 h-6"></IconDelete>
              </button>
          </div>
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Info from './Icons/Info.vue'
import Question from './Icons/Question.vue'
import IconDelete from './Icons/Delete.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const selected = ref(false)
const props = defineProps(nodeViewProps)
const isEditable = computed(() => props.editor.isEditable)

function setStyleToBlue() {
  props.updateAttributes({
    color: 'blue',
    type: "info"
  })
}

function setStyleToCyan() {
  props.updateAttributes({
    color: 'cyan',
    type: "info"
  })
}

function setStyleToYellow() {
  props.updateAttributes({
    color: 'yellow',
    type: "info"
  })
}

function setStyleToRed() {
  props.updateAttributes({
    color: 'red',
    type: "info"
  })
}

function setStyleToGreen() {
  props.updateAttributes({
    color: 'green',
    type: "info"
  })
}

function setStyleToBlueQuestion() {
  props.updateAttributes({
    color: 'blue',
    type: "question"
  })
}

function setStyleToCyanQuestion() {
  props.updateAttributes({
    color: 'cyan',
    type: "question"
  })
}

function setStyleToYellowQuestion() {
  props.updateAttributes({
    color: 'yellow',
    type: "question"
  })
}

function setStyleToRedQuestion() {
  props.updateAttributes({
    color: 'red',
    type: "question"
  })
}

function setStyleToGreenQuestion() {
  props.updateAttributes({
    color: 'green',
    type: "question"
  })
}

function onClick(e: Event) {
  selected.value = true
}

// 是否是整个editor.state.doc.content的最后一个node
let isTheLastNode = computed(
  () => props.node.nodeSize + props.getPos() == props.editor.state.doc.content.size
)

function deleteNode() {
  props.deleteNode()
}

function checkToolbar(event: Event) {
  if (!isEditable) {
    selected.value = false
    console.log('SmartBanner: editor is not editable, hide banner toolbar')
    return
  }

  // 如果鼠标在 Banner 内，显示菜单

  const currentPos = props.editor.state.selection.anchor
  const start = props.getPos()
  const end = props.getPos() + props.node.nodeSize

  console.log('SmartBanner: clicked')
  console.log('SmartBanner: currentPos', currentPos)
  console.log('SmartBanner: start', start)
  console.log('SmartBanner: end', end)

  selected.value = currentPos >= start && currentPos <= end
}

onMounted(() => {
  // 如果是最后一个节点，在本节点后插入一个空的p，防止光标无法移动到下一个节点
  if (isTheLastNode.value) {
    let tail = props.editor.state.doc.content.size
    console.log('SmartBanner: 结尾插入p，防止光标无法移动')
    props.editor.commands.insertContentAt(tail, '<p></p>', {
      updateSelection: false,
      parseOptions: {
        preserveWhitespace: 'full'
      }
    })
  }

  document.addEventListener('click', checkToolbar)
})

onUnmounted(() => {
  document.removeEventListener('click', checkToolbar)
})
</script>
