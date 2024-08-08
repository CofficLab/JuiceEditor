<template>
  <NodeViewWrapper>
    <Panel :deleteNode="props.deleteNode" :show-border="true" :forceDisplay="forceDisplay">
      <template v-slot:content>
        <div>
          <!-- 编辑区域 -->
          <div class="relative" ref="codeDom" v-if="show">
            <MonacoCard
              :code="content"
              :monacoLink="props.extension.options.monacoLink"
              :onUpdated="onContentUpdated"
              :language="language"
              :on-language-changed="onLanguageChanged"
            ></MonacoCard>
          </div>

          <NodeViewContent class="hidden"></NodeViewContent>
        </div>
      </template>

      <template v-slot:operators> </template>
    </Panel>
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Panel from '../Panel.vue'
import MonacoCard from './MonacoCard.vue'
import { computed, onUpdated, ref } from 'vue'
import { SmartLanguage } from './Entities/SmartLanguage'

const props = defineProps(nodeViewProps)
const content = ref(props.node.textContent)
const language = SmartLanguage.fromString(props.node.attrs.language)
const pos = props.getPos() // 获取当前节点的位置
const resolvedPos = props.editor.state.doc.resolve(pos) // 解析位置
const currentNodeIndex = resolvedPos.index() // 获取当前节点在父节点中的索引
const forceDisplay = ref(false)

const show = computed(() => {
  let parent = props.editor.state.doc.resolve(props.getPos()).parent
  if (parent.type.name != 'groupPre') {
    return true
  }

  return currentNodeIndex == parent.attrs.current
})

onUpdated(() => {
  // 当 Tiptap 更新内容后，该组件不一定会被销毁，可能被 Vue 复用
  log('updated')
})

function onLanguageChanged(lan: SmartLanguage) {
  props.updateAttributes({
    language: lan.key
  })
}

function onContentUpdated(content: string) {
  let firstChild = props.node.firstChild

  if (firstChild == null) {
    console.log('first child is null')
    props.editor
      .chain()
      .insertContentAt(props.getPos() + 1, content)
      .run()
    return
  }

  let firstChildPos = props.getPos() + 1
  let firstChildPosEnd = firstChildPos + firstChild.nodeSize

  // console.log('insertAt: ', firstChildPos, firstChildPosEnd, content)
  props.editor
    .chain()
    .insertContentAt(
      {
        from: firstChildPos,
        to: firstChildPosEnd
      },
      content
    )
    .run()
}

function log(...message: any[]) {
  console.log('🐰 SmartPre:', message)
}
</script>
