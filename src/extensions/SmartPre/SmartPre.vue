<template>
  <NodeViewWrapper class="bg-red-50">
    <!-- 编辑区域 -->
    <div class="relative" ref="codeDom">
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
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Panel from '../Panel.vue'
import MonacoBox from './MonacoBox.vue'
import { computed, ref } from 'vue'
import { SmartLanguage } from './Entities/SmartLanguage'

const props = defineProps(nodeViewProps)
const content = ref(props.node.textContent)
const language = computed<SmartLanguage>(() => SmartLanguage.fromString(props.node.attrs.language))

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
