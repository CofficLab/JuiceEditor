<template>
  <NodeViewWrapper>
    <div class="relative">
      <div ref="editorContainer" class="w-full">
        <!-- Shadow DOM will be created here -->
      </div>

      <div contenteditable="false" class="absolute top-0 right-0 z-50">
        <LanguageSelect :editable="true" :current="language" :on-changed="onLanguageChanged">
        </LanguageSelect>
      </div>
    </div>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import * as monaco from 'monaco-editor'
import { defineProps, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { SmartLanguage } from './Entities/SmartLanguage';
import MonacoFactory from './Entities/MonacoFactory';
import LanguageSelect from './LanguageSelect.vue';

const props = defineProps(nodeViewProps)

const language = SmartLanguage.fromString(props.node.attrs.language)
const editorContainer = ref<HTMLDivElement | null>(null)
var monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null

onMounted(() => {
  // Create shadow DOM
  const shadow = editorContainer.value?.attachShadow({ mode: 'open' })

  // Create container for Monaco
  const editorHost = document.createElement('div')
  editorHost.style.width = '100%'
  shadow?.appendChild(editorHost)

  const innerStyle = document.createElement('style');
  innerStyle.innerText =
    '@import "node_modules/monaco-editor/min/vs/editor/editor.main.css";';
  shadow?.appendChild(innerStyle);

  // Initialize Monaco editor
  monacoEditor = MonacoFactory.createEditor({
    target: editorHost,
    content: props.node.textContent,
    language: SmartLanguage.fromString(props.node.attrs.language),
    onContentChanged: (editor) => {
      let content = editor.getValue()
      let currentNodeFrom = props.getPos()
      let currentNodeTo = currentNodeFrom + props.node.nodeSize

      if (content == props.node.textContent) {
        return
      }

      props.editor.commands.insertContentAt({
        from: currentNodeFrom,
        to: currentNodeTo
      }, `<pre><code class='language-${language.key}'>${content}</code></pre>`)
    }
  })
})

onBeforeUnmount(() => {
  if (monacoEditor) {
    monacoEditor.dispose()
  }
})

function onLanguageChanged(language: SmartLanguage) {
  monaco.editor.setModelLanguage(monacoEditor!.getModel()!, language.getMonacoLanguage());
}

watch(() => props.node.textContent, (newContent) => {
  monacoEditor!.setValue(newContent)
})

</script>
