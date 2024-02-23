<template>
  <node-view-wrapper>
    <div class="dropdown dropdown-open dropdown-top">
      <div tabindex="0" role="button" class="">
        <!-- 内容 -->
        <div
          class="flex flex-row gap-2 rounded-xl p-3 ring-1 border border-dashed"
          v-bind:class="[style, { 'border-yellow-500/50': selected }, { 'border-0': !selected }]"
          @click="onClick"
        >
          <div class="flex items-center justify-between">
            <Info></Info>
          </div>
          <node-view-content class="border border-none px-4 dark:border-cyan-800" />
        </div>
      </div>

      <!-- 操作栏 -->
      <div
        tabindex="0"
        class="p-2 shadow dropdown-content z-[1]"
        v-show="selected"
        contenteditable="false"
      >
        <div class="join">
          <button class="btn btn-sm join-item" @click="setStyleToCyan">
            <Info class="w-5 h-6 text-cyan-500"></Info>
          </button>
          <button class="btn btn-sm join-item" @click="setStyleToBlue">
            <Info class="w-5 h-6 text-blue-500"></Info>
          </button>
          <button class="btn btn-sm join-item" @click="deleteNode">
            <IconDelete class="w-5 h-6"></IconDelete>
          </button>
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Info from './IconInfo.vue'
import IconDelete from './Icons/Delete.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const selected = ref(false)
const props = defineProps(nodeViewProps)
const isEditable = computed(() => props.editor.isEditable)
const backgroundStyles = {
  cyan: 'bg-gradient-to-r from-cyan-800/50',
  blue: 'bg-gradient-to-r from-blue-800/50'
}
const style = ref(backgroundStyles.cyan)

function setStyleToBlue() {
  style.value = backgroundStyles.blue
  props.updateAttributes({
    class: style.value
  })
}

function setStyleToCyan() {
  style.value = backgroundStyles.cyan
  props.updateAttributes({
    class: style.value
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
