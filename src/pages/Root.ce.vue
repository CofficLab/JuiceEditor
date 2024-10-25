<script setup lang="ts">
import { useMessageStore } from '../store/MessageStore'
import { useAppStore } from '../store/AppStore';
import Message from './Message.vue';
import { useModeStore } from '../store/ModeStore';
import { inject, watch } from 'vue';
import ErrorPage from './ErrorPage.vue';
import { useRequestStore } from '../store/RequestStore';
import ListenerProvider from '../provider/ListenerProvider';
import ApiProvider from '../provider/ApiProvider';
import { useFeatureStore } from '../store/FeatureStore';
import PluginProvider from '../provider/PluginProvider';
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
const config = useConfigStore()
const messageStore = useMessageStore()
const modeStore = useModeStore()
const feature = useFeatureStore()
const renderKey = ref(0);
const requestStore = useRequestStore()
var editor: EditorVue = inject('editor')!

editor.on('create', () => {
    let verbose = true

    if (verbose) {
        console.log(title, "onCreate")
    }

    modeStore.setMode(props.mode, 'App.onCreate')

    bootProviders(editor)
    apiProvider!.boot()
    listenerProvider!.boot(modeStore.mode)

    app.setReady('App.onCreate')
})

// init all providers

let apiProvider: ApiProvider | null = null
let listenerProvider: ListenerProvider | null = null
let pluginProvider: PluginProvider | null = null

// collect events from every store
watch(() => app.ready, () => {
    if (app.ready) {
        pluginProvider!.onReady(modeStore.mode)
    } else {
        pluginProvider!.onLoading(app.loadingReason)
    }
})

// collect message from every store
watch(() => app.message.uuid, () => messageStore.setMessage(app.message))

// collect error from every store
watch(() => app.error, () => messageStore.setError(app.error))


window.addEventListener('downloadImage', ((event: CustomEvent) => {
    pluginProvider!.plugins.forEach(plugin => {
        plugin.onDownloadImage(event.detail.src, event.detail.name)
    })
}) as EventListener);

function bootProviders(editor: EditorVue) {
    apiProvider = new ApiProvider({
        featureProvider: feature,
        modeProvider: modeStore,
        requestProvider: requestStore,
        editor: editor,
        configProvider: config
    })
    listenerProvider = new ListenerProvider(config.listeners)
    pluginProvider = new PluginProvider(config.plugins)
}

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
    <Message :plugins="config.plugins"></Message>

    <!-- Error -->
    <ErrorPage></ErrorPage>
</template>
