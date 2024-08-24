<template>
  <NodeViewWrapper>
    <Panel
      v-if="showPanel"
      :inline="false"
      :deleteNode="props.deleteNode"
      :readOnly="!props.editor.isEditable"
      :editor="props.editor"
      :node="props.node"
      :getPos="props.getPos"
      :withPadding="isParagraph"
    >
      <template v-slot:content>
        <div
          contenteditable="false"
          :class="{
            [props.node.attrs.class]: true,
            'py-2': true,
            'flex flex-row': isBanner,
            'shadow-sm backdrop-blur': isBanner
          }"
        >
          <Info v-if="isInfo" class="w-5 h-6 ml-2 mr-1 inline" contenteditable="false"></Info>
          <Question v-if="isQuestion" class="w-5 h-6 ml-2 mr-1"></Question>
          <NodeViewContent
            contenteditable="true"
            class="border border-none dark:border-cyan-800 inline"
          />
        </div>
      </template>

      <template v-slot:operators>
        <Button @click="setStyleToCyan('info')">
          <Info class="w-5 h-6 text-cyan-500"></Info>
        </Button>
        <Button @click="setStyleToBlue('info')">
          <Info class="w-5 h-6 text-blue-500"></Info>
        </Button>
        <Button @click="setStyleToYellow('info')">
          <Info class="w-5 h-6 text-yellow-500"></Info>
        </Button>
        <Button @click="setStyleToRed('info')">
          <Info class="w-5 h-6 text-red-500"></Info>
        </Button>
        <Button @click="setStyleToGreen('info')">
          <Info class="w-5 h-6 text-green-500"></Info>
        </Button>
        <Button @click="setStyleToCyan('question')">
          <Question class="w-5 h-6 text-cyan-500"></Question>
        </Button>
        <Button @click="setStyleToBlue('question')">
          <Question class="w-5 h-6 text-blue-500"></Question>
        </Button>
        <Button @click="setStyleToYellow('question')">
          <Question class="w-5 h-6 text-yellow-500"></Question>
        </Button>
        <Button @click="setStyleToRed('question')">
          <Question class="w-5 h-6 text-red-500"></Question>
        </Button>
        <Button @click="setStyleToGreen('question')">
          <Question class="w-5 h-6 text-green-500"></Question>
        </Button>
        <Button @click="setStyleToParagraph">
          <IconStop class="w-5 h-6 text-gray-500"></IconStop>
        </Button>
      </template>
    </Panel>

    <NodeViewContent v-else />
  </NodeViewWrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import Panel from '../Panel.vue'
import Button from '../../ui/Button.vue'
import Info from '../../ui/icons/Info.vue'
import Question from '../../ui/icons/Question.vue'
import IconStop from '../../ui/icons/IconStop.vue'
import { computed } from 'vue'

const props = defineProps(nodeViewProps)
const showPanel = shouldShowPanel()
const isParagraph = computed(() => props.node.attrs.type == 'paragraph')
const isInfo = computed(() => props.node.attrs.type == 'info')
const isQuestion = computed(() => props.node.attrs.type == 'question')
const isBanner = computed(() => isInfo.value || isQuestion.value)

function shouldShowPanel() {
  let doc = props.editor.state.doc
  let parent = doc.resolve(props.getPos()).parent

  return !['tableHeader', 'tableCell', 'taskItem', 'listItem', 'blockquote'].includes(
    parent.type.name
  )
}

function setStyleToParagraph() {
  props.updateAttributes({
    class: '',
    type: 'paragraph'
  })
}

function setStyleToBlue(type: string = 'info') {
  props.updateAttributes({
    class: 'bg-gradient-to-r from-blue-800/50 to-blue-800/30',
    type: type
  })
}

function setStyleToCyan(type: string = 'info') {
  props.updateAttributes({
    class: 'bg-gradient-to-r from-cyan-800/50 to-cyan-800/30',
    type: type
  })
}

function setStyleToYellow(type: string = 'info') {
  props.updateAttributes({
    class: 'bg-gradient-to-r from-yellow-800/50 to-yellow-800/30',
    type: type
  })
}

function setStyleToRed(type: string = 'info') {
  props.updateAttributes({
    class: 'bg-gradient-to-r from-red-800/50 to-red-800/30',
    type: type
  })
}

function setStyleToGreen(type: string = 'info') {
  props.updateAttributes({
    class: 'bg-gradient-to-r from-green-800/50 to-green-800/30',
    type: type
  })
}
</script>
