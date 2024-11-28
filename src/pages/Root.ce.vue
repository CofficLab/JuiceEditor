<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref } from 'vue';
import Loading from '../ui/Loading.vue'
import { Editor as EditorVue } from '@tiptap/vue-3';
import SourceCode from './SourceCode.vue'
import CoreEditor from './CoreEditor.vue'
import { makeExtensions, defaultDrawIoLink, defaultTranslateApi, defaultFocusClassName } from '../model/TiptapAgent';
import PublicEditor from '../model/Editor';
import { SourceCodeStorage } from '../extensions/SourceCode';
import { SmartDocStorage } from '../extensions/SmartDoc';

const publicEditor: PublicEditor = inject('publicEditor')!
const loading = ref(true)
const editor = new EditorVue({
    extensions: makeExtensions({
        drawIoLink: defaultDrawIoLink,
        translateApi: defaultTranslateApi,
        focusClassName: defaultFocusClassName,
    }),
    editable: true,
    autofocus: 'start',
    onBeforeCreate: () => {
        publicEditor.options.onBeforeCreate?.()
    },
    onCreate: ({ editor: tiptapEditor }) => {
        publicEditor.editor = tiptapEditor
        publicEditor.options.onCreate?.(publicEditor)
        editor.commands.boot()
        publicEditor.options.onBooted?.(publicEditor)
    },
    onContentError: (error) => {
        publicEditor.options.onContentError?.()
    },
    onUpdate: ({ editor: tiptapEditor }) => {
        updateLoadingState()

        publicEditor.options.onUpdate?.(publicEditor)
    },
    onBlur: ({ editor: tiptapEditor }) => {
        updateLoadingState()
    },
    onDestroy: () => {
    },
    onFocus: ({ editor: tiptapEditor }) => {
        updateLoadingState()
    },
    onSelectionUpdate: () => {
    }
})



function updateLoadingState() {
    const docStorage = editor.storage.doc as SmartDocStorage
    loading.value = docStorage.loading
}

</script>

<style>
@import '../styles/app.css';
</style>

<template>
    <div v-if="loading"
        class="fixed inset-0 flex items-center justify-center bg-slate-500/20 dark:bg-slate-900 bg-opacity-95 z-50 text-left">
        <div class="transform scale-150">
            <Loading></Loading>
        </div>
    </div>

    <main class="main text-left" v-if="editor">
        <slot></slot>

        <div class="flex flex-row w-full justify-center gap-0">
            <CoreEditor :editor="editor" />
        </div>
    </main>
</template>
