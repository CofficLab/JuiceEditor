<template>
  <NodeViewWrapper>
    <Panel>
      <template v-slot:content>
        <div>
          <!-- 编辑区域 -->
          <div class="relative" ref="codeDom" v-if="show">
            <MonacoBox
              contenteditable="true"
              :editable="editor.isEditable"
              :readOnly="!editor.isEditable"
              :content="content"
              :showRunButton="node.attrs.run == 1"
              :showLineNumbers="true"
              :language="language"
              :onContentChanged="handleContentChanged"
              :onLanguageChanged="handleLanguageChanged"
            >
            </MonacoBox>
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
import MonacoBox from './MonacoBox.vue'
import { computed, ref, onMounted } from 'vue'
import { SmartLanguage } from './Entities/SmartLanguage'

const props = defineProps(nodeViewProps)
const content = ref(props.node.textContent)
const language = computed<SmartLanguage>(() => SmartLanguage.fromString(props.node.attrs.language))
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

function handleContentChanged(content: string) {
  // console.log('🐰 SmartPre: found monaco content changed', content)

  // 异步更新，避免影响Monaco的响应速度
  setTimeout(() => {
    let pos = props.getPos()

    props.editor.commands.insertContentAt(
      {
        from: pos + 1,
        to: pos + 1 + props.node.textContent.length
      },
      content
    )
  }, 5)
}

function handleLanguageChanged(language: SmartLanguage) {
  console.log('🐰 SmartPre: monaco language changed', language.key)

  props.updateAttributes({
    language: language.key
  })
}
</script>
