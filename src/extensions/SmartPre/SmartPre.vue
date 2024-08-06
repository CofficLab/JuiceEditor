<template>
  <NodeViewWrapper>
    <Panel :deleteNode="props.deleteNode">
      <template v-slot:content>
        <div>
          <!-- 编辑区域 -->
          <div class="relative" ref="codeDom" v-if="show">
            <MonacoCard
              :code="content"
              :monacoLink="props.extension.options.monacoLink"
              :onUpdated="onUpdated"
            ></MonacoCard>
          </div>

          <NodeViewContent class="hidden"></NodeViewContent>
        </div>
      </template>
    </Panel>
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Panel from '../Panel.vue'
import MonacoCard from './MonacoCard.vue'
import { computed, ref, onMounted } from 'vue'

const props = defineProps(nodeViewProps)
const content = ref(props.node.textContent)
const pos = props.getPos() // 获取当前节点的位置
const resolvedPos = props.editor.state.doc.resolve(pos) // 解析位置
const currentNodeIndex = resolvedPos.index() // 获取当前节点在父节点中的索引

const show = computed(() => {
  let parent = props.editor.state.doc.resolve(props.getPos()).parent
  if (parent.type.name != 'groupPre') {
    return true
  }

  return currentNodeIndex == parent.attrs.current
})

onMounted(() => {
  console.log('🐰 SmartPre: mounted')
})

function onUpdated(content: string) {
  let firstChild = props.node.firstChild!
  let firstChildPos = props.getPos() + 1
  let firstChildPosEnd = firstChildPos + firstChild.nodeSize

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
</script>
