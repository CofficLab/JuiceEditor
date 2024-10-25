<script setup lang="ts">
import { useAppStore } from '../store/AppStore';
import Message from './Message.vue';
import { useModeStore } from '../store/ModeStore';
import { inject } from 'vue';
import ErrorPage from './ErrorPage.vue';
import Loading from '../ui/Loading.vue'
import { useConfigStore } from '../store/ConfigStore';
import { Editor as EditorVue } from '@tiptap/vue-3';
import { ref } from 'vue';
import App from './App.vue'
import PageMode from '../model/PageMode';
import Features from './Features.vue'

const props = defineProps({
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

const title = "💻 App"
const app = useAppStore()
const modeStore = useModeStore()
const renderKey = ref(0);
var editor: EditorVue = inject('editor')!

editor.on('create', () => {
    let verbose = true

    if (verbose) {
        console.log(title, "onCreate")
    }

    modeStore.setMode(props.mode, 'App.onCreate')
    app.setReady('App.onCreate')
})

</script>

<style>
@import '../styles/app.css';
@import 'monaco-editor/min/vs/editor/editor.main.css';
</style>

<template>
    <div v-if="app.ready == false"
        class="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-80 z-50 text-left">
        <div class="transform scale-150">
            <Loading></Loading>
        </div>
    </div>

    <Features v-if="mode == PageMode.FEATURES.type" />

    <App :editor="editor" :key="renderKey" v-else-if="app.ready" />

    <!-- Message -->
    <Message></Message>

    <!-- Error -->
    <ErrorPage></ErrorPage>
</template>
