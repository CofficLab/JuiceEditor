<template>
  <div v-if="true" :style="`transform: translate(${marginLeft}px, ${scrollTop}px);`" class="w-24">
    <ButtonBar>
      <Button tip="删除" @click="deleteNode">
        <IconDelete></IconDelete>
      </Button>

      <Button>
        <IconNewLine></IconNewLine>
      </Button>
    </ButtonBar>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Editor, NodePos } from '@tiptap/core'
import ButtonBar from '../ui/ButtonBar.vue'
import Button from '../ui/Button.vue'
import IconDelete from '../ui/icons/Delete.vue'
import IconNewLine from '../ui/icons/IconNewLine.vue'
import TiptapHelper from '../helper/TiptapHelper'

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const emoji = '🐱 BlockMenu'
const editor = computed(() => props.editor)
const visible = ref(true)
const marginLeft = ref(0)
const scrollTop = ref(0)

watch(
  editor,
  (val) => {
    if (val) {
      editor.value.on('selectionUpdate', () => {
        console.log('selectionUpdate')
        updateMenuPosition()
      })
      editor.value.on('blur', () => {
        console.log('blur')
        visible.value = false
        updateMenuPosition()
      })
      editor.value.on('focus', () => {
        console.log('focus')
        updateMenuPosition()
      })
    } else {
      visible.value = false
    }
  },
  { immediate: true }
)

function deleteNode() {
  let selection = editor.value.state.selection
  let nodePos = editor.value.$pos(selection.$anchor.pos)
  let node = nodePos.node
  let parent = nodePos.parent?.node

  if (!parent) {
    return
  }

  console.log(emoji, 'current node is', node.type.name)
  console.log(emoji, 'current node is', node.type.name)
  console.log(emoji, 'current parent node is', parent?.type.name)
  console.log(emoji, 'current pos is', nodePos.pos)
  console.log(emoji, 'current node size is', node.nodeSize)

  if (['taskList', 'taskItem'].includes(parent.type.name)) {
    console.log(emoji, 'delete taskItem')
    editor.value.commands.deleteNode(parent.type.name)
  }

  // editor.value.commands.deleteRange({
  //   from: pos - 1,
  //   to: node.nodeSize + pos
  // })
}

function updateMenuPosition() {
  let editorDom = props.editor.view.dom

  if (!editorDom) {
    throw new Error('editorDom is null')
  }

  let { offsetLeft } = editorDom as HTMLElement

  // 减去的是menu自身的宽度
  marginLeft.value = offsetLeft - 96

  const { offsetTop } = TiptapHelper.getFocusedNodePosition(editor.value)

  if (offsetTop === null) {
    return
  }

  visible.value = true
  scrollTop.value = offsetTop - 24
}
</script>
