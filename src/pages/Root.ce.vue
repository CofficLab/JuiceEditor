<script setup lang="ts">
import { inject } from 'vue';
import Loading from '../ui/Loading.vue'
import { Editor as EditorVue } from '@tiptap/vue-3';
import App from './App.vue'
import PageMode from '../model/PageMode';
import Features from './Features.vue'
import { makeExtensions, defaultDrawIoLink, defaultTranslateApi, defaultFocusClassName } from '../model/TiptapAgent';
import RootAgent from '../model/RootAgent';

defineProps({
    mode: {
        type: String,
        required: false,
        default: PageMode.BASIC_TYPE
    }
})

const rootAgent: RootAgent = inject('rootAgent')!

const editor = new EditorVue({
    extensions: makeExtensions({
        drawIoLink: defaultDrawIoLink,
        translateApi: defaultTranslateApi,
        focusClassName: defaultFocusClassName,
    }),
    editable: true,
    autofocus: 'start',
    onBeforeCreate: () => {
        rootAgent.onBeforeCreateCallback()
    },
    onCreate: ({ editor }) => {
        rootAgent.editor = editor
        rootAgent.onCreateCallback()
    },
    onContentError: (error) => {
        rootAgent.onContentErrorCallback(error.error)
    }
})

</script>

<style>
@import '../styles/app.css';
@import 'monaco-editor/min/vs/editor/editor.main.css';
</style>

<template>
    <div v-if="editor && editor.storage.smartReady.ready == false"
        class="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-80 z-50 text-left">
        <div class="transform scale-150">
            <Loading></Loading>
        </div>
    </div>

    <Features v-if="mode == PageMode.FEATURES.type" />

    <App :editor="editor" v-else-if="editor && editor.storage.smartReady.ready" />
</template>
