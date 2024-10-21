<script setup lang="ts">
import { useMessageStore } from '../store/MessageStore'
import { useAppStore } from '../store/AppStore';
import Message from './Message.vue';
import { useModeStore } from '../store/ModeStore';
import { watch } from 'vue';
import ErrorPage from './ErrorPage.vue';
import { useRequestStore } from '../store/RequestStore';
import ListenerProvider from '../provider/ListenerProvider';
import ApiProvider from '../provider/ApiProvider';
import { useFeatureStore } from '../store/FeatureStore';
import PluginProvider from '../provider/PluginProvider';
import Loading from '../ui/Loading.vue'
import TiptapAgent from '../helper/TiptapHelper'
import EditorData from '../model/EditorData'
import { useConfigStore } from '../store/ConfigStore';
import { Editor } from '@tiptap/vue-3';
import { ref } from 'vue';
import App from './App.vue'
import PageMode from '../model/PageMode';


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
const requestStore = useRequestStore()
var editor = createEditor()
const renderKey = ref(0);

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

// if config change, reload
watch(() => config.updatedAt, () => {
    pluginProvider!.onConfigChanged()
    reload('Config Changed')
})

window.addEventListener('downloadImage', ((event: CustomEvent) => {
    pluginProvider!.plugins.forEach(plugin => {
        plugin.onDownloadImage(event.detail.src, event.detail.name)
    })
}) as EventListener);

function createEditor(): Editor {
    return TiptapAgent.create({
        extensions: config.getExtensions(),
        content: EditorData.default().html,
        editable: !props.readonly,
        drawEnable: feature.drawEnabled,
        tableEnable: feature.tableEnabled,
        onCreate: (doc: EditorData | Error) => {
            let verbose = false

            if (verbose) {
                console.log(title, "onCreate", doc)
            }

            modeStore.setMode(props.mode, 'App.onCreate')

            bootProviders(editor)
            apiProvider!.boot()
            listenerProvider!.boot(modeStore.mode)

            app.setReady('App.onCreate')
        },
        onUpdate: (data: EditorData | Error) => {
            let verbose = false

            if (verbose) {
                console.log(title, "OnUpdate", data)
            }

            if (!feature.editable) {
                if (verbose) {
                    console.log('只读模式，不回调更新')
                }

                return
            }

            if (data instanceof Error) {
                app.setError(data)
            } else {
                pluginProvider!.onDocUpdated(data)
            }
        },
        onSelectionUpdate(type) {

        }
    })
}

function reload(reason: string) {
    app.setLoading(reason)
    editor.destroy()
    editor = createEditor()
    renderKey.value += 1;
}

function bootProviders(editor: Editor) {
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
        class="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-80 z-50">
        <div class="transform scale-150">
            <Loading></Loading>
        </div>
    </div>

    <App :editor="editor" :key="renderKey" v-if="app.ready" />

    <!-- Message -->
    <Message :plugins="config.plugins"></Message>

    <!-- Error -->
    <ErrorPage></ErrorPage>
</template>
