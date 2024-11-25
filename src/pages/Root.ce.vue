<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import Loading from '../ui/Loading.vue'
import { Editor as EditorVue } from '@tiptap/vue-3';
import SourceCode from './SourceCode.vue'
import CoreEditor from './CoreEditor.vue'
import { makeExtensions, defaultDrawIoLink, defaultTranslateApi, defaultFocusClassName } from '../model/TiptapAgent';
import Editor from '../model/Editor';

const rootAgent: Editor = inject('rootAgent')!
const ready = ref(false)
const editor = new EditorVue({
    extensions: makeExtensions({
        drawIoLink: defaultDrawIoLink,
        translateApi: defaultTranslateApi,
        focusClassName: defaultFocusClassName,
    }),
    editable: true,
    autofocus: 'start',
    onBeforeCreate: () => {
        rootAgent.options.onBeforeCreate?.()
    },
    onCreate: ({ editor }) => {
        rootAgent.editor = editor
        rootAgent.options.onCreate?.(rootAgent)
        ready.value = true
    },
    onContentError: (error) => {
        rootAgent.options.onContentError?.()
    },
    onUpdate: () => {
        rootAgent.options.onUpdate?.(rootAgent)
    }
})

function onEditorMounted() {
    editor.commands.setMounted()
    rootAgent.options.onMounted?.(rootAgent)
}

const showSourceCode = computed(() => {
    return editor.storage.sourceCode.shouldShow
})

</script>

<style>
@import '../styles/app.css';
</style>

<template>
    <div v-if="editor && !ready"
        class="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-80 z-50 text-left">
        <div class="transform scale-150">
            <Loading></Loading>
        </div>
    </div>

    <main class="main text-left" v-if="editor && ready">
        <slot></slot>

        <div class="flex flex-row w-full justify-center gap-0">
            <SourceCode :editor="editor" v-if="showSourceCode" :class="{ 'w-1/2': true }" />
            <CoreEditor :editor="editor" :onEditorMounted="onEditorMounted" :class="{ 'w-1/2': showSourceCode }" />
        </div>
    </main>
</template>
