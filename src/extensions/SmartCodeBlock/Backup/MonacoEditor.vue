<template>
    <div class="relative">
        <div ref="editorContainer" class="w-full">
            <!-- Shadow DOM will be created here -->
        </div>

        <div contenteditable="false" class="absolute top-0 right-0 z-50">
            <LanguageSelect :editable="true" :current="language" :on-changed="onLanguageChanged">
            </LanguageSelect>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue';
import { SmartLanguage } from '../SmartLanguage';
import MonacoFactory from '../MonacoFactory';
import LanguageSelect from './LanguageSelect.vue';

const props = defineProps({
    content: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
})

const language = SmartLanguage.fromString(props.language)
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
        content: props.content,
        language: SmartLanguage.fromString(props.language),
    })
})

onBeforeUnmount(() => {
    if (monacoEditor) {
        monacoEditor.dispose()
    }
})

function onLanguageChanged(language: SmartLanguage) {
    console.log('🍋 💼 MonacoEditor: language changed, language id ->', language.key)
    monaco.editor.setModelLanguage(monacoEditor!.getModel()!, language.getMonacoLanguage());
}

</script>
