<template>
  <node-view-wrapper>
    <Panel>
      <template v-slot:content>
        <!-- 内容 -->
        <div
          class="flex flex-row gap-2 rounded-xl px-3 py-2 shadow-sm backdrop-blur"
          v-bind:class="[
            { 'border-0 ring-1': !selected },
            {
              'bg-gradient-to-r from-cyan-800/50 to-cyan-800/30': props.node.attrs.color == 'cyan'
            },
            {
              'bg-gradient-to-r from-blue-800/50 to-blue-800/30': props.node.attrs.color == 'blue'
            },
            {
              'bg-gradient-to-r from-yellow-800/50 to-yellow-800/30':
                props.node.attrs.color == 'yellow'
            },
            { 'bg-gradient-to-r from-red-800/50 to-red-800/30': props.node.attrs.color == 'red' },
            {
              'bg-gradient-to-r from-green-800/50 to-green-800/30':
                props.node.attrs.color == 'green'
            }
          ]"
        >
          <div class="flex items-center justify-between">
            <Info v-if="props.node.attrs.type == 'info'" class="w-5 h-6"></Info>
            <Question v-if="props.node.attrs.type == 'question'" class="w-5 h-6"></Question>
          </div>
          <node-view-content class="border border-none px-4 dark:border-cyan-800" />
        </div>
      </template>

      <template v-slot:operators>
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
        <button class="btn btn-sm join-item" @click="deleteNode">
          <IconDelete class="w-5 h-6"></IconDelete>
        </button>
      </template>
    </Panel>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Info from './Icons/Info.vue'
import Question from './Icons/Question.vue'
import IconDelete from './Icons/Delete.vue'
import { computed, onMounted } from 'vue'
import Panel from '../Panel.vue'

const props = defineProps(nodeViewProps)

function setStyleToBlue() {
  props.updateAttributes({
    color: 'blue',
    type: 'info'
  })
}

function setStyleToCyan() {
  props.updateAttributes({
    color: 'cyan',
    type: 'info'
  })
}

function setStyleToYellow() {
  props.updateAttributes({
    color: 'yellow',
    type: 'info'
  })
}

function setStyleToRed() {
  props.updateAttributes({
    color: 'red',
    type: 'info'
  })
}

function setStyleToGreen() {
  props.updateAttributes({
    color: 'green',
    type: 'info'
  })
}

function setStyleToBlueQuestion() {
  props.updateAttributes({
    color: 'blue',
    type: 'question'
  })
}

function setStyleToCyanQuestion() {
  props.updateAttributes({
    color: 'cyan',
    type: 'question'
  })
}

function setStyleToYellowQuestion() {
  props.updateAttributes({
    color: 'yellow',
    type: 'question'
  })
}

function setStyleToRedQuestion() {
  props.updateAttributes({
    color: 'red',
    type: 'question'
  })
}

function setStyleToGreenQuestion() {
  props.updateAttributes({
    color: 'green',
    type: 'question'
  })
}

// 是否是整个editor.state.doc.content的最后一个node
let isTheLastNode = computed(
  () => props.node.nodeSize + props.getPos() == props.editor.state.doc.content.size
)

function deleteNode() {
  props.deleteNode()
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
})
</script>
