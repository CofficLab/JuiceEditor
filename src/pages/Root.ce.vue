<script setup lang="ts">
import { inject } from 'vue';
import Loading from '../ui/Loading.vue'
import { Editor as EditorVue } from '@tiptap/vue-3';
import { ref } from 'vue';
import App from './App.vue'
import PageMode from '../model/PageMode';
import Features from './Features.vue'

defineProps({
    readonly: {
        type: Boolean,
        default: false
    },
    mode: {
        type: String,
        required: false,
        default: PageMode.BASIC_TYPE
    }
})

const renderKey = ref(0);
var editor: EditorVue = inject('editor')!

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

    <App :editor="editor" :key="renderKey" v-else-if="editor && editor.storage.smartReady.ready" />
</template>
