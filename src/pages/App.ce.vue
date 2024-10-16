<script setup lang="ts">
import { useMessageStore } from '../store/MessageStore'
import { useAppStore } from '../store/AppStore';
import Message from './Message.vue';
import { useModeStore } from '../store/ModeStore';
import { onMounted, onBeforeUnmount, watch } from 'vue';
import ErrorPage from './ErrorPage.vue';
import { useRequestStore } from '../store/RequestStore';
import ListenerProvider from '../provider/ListenerProvider';
import ApiProvider from '../provider/ApiProvider';
import { useFeatureStore } from '../store/FeatureStore';
import PluginProvider from '../provider/PluginProvider';
import Loading from '../ui/Loading.vue'
import TiptapAgent from '../helper/TiptapHelper'
import EditorData from '../model/EditorData'
import CoreEditor from './CoreEditor.vue'
import { useConfigStore } from '../store/ConfigStore';
import { AppProps } from '../model/AppProps'

const props = defineProps(AppProps)

const title = "💻 App"
const app = useAppStore()
const config = useConfigStore()
const messageStore = useMessageStore()
const modeStore = useModeStore()
const feature = useFeatureStore()
const requestStore = useRequestStore()

// init config

// init editor

const editor = TiptapAgent.create({
	extensions: config.extensions,
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

		apiProvider.boot()
		listenerProvider.boot(modeStore.mode)

		app.loading = false
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
			pluginProvider.onDocUpdated(data)
		}
	},
	onSelectionUpdate(type) {

	}
})

// init all providers

const apiProvider = new ApiProvider({
	featureProvider: feature,
	modeProvider: modeStore,
	requestProvider: requestStore,
	editor: editor,
	configProvider: config
})
const listenerProvider = new ListenerProvider(config.listeners)
const pluginProvider = new PluginProvider(config.plugins)

// collect events from every store
watch(() => app.ready, () => {
	if (app.ready) {
		pluginProvider.onReady(modeStore.mode)
	}
})

// collect message from every store
watch(() => app.message.uuid, () => messageStore.setMessage(app.message))

// collect error from every store
watch(() => app.error, () => messageStore.setError(app.error))

onMounted(() => {
	editor.on('translation:error', handleTranslationError)
})

onBeforeUnmount(() => {
	editor.off('translation:error', handleTranslationError)
})

function handleTranslationError(message: string) {
	messageStore.setError(new Error(message))
}
</script>

<style>
@import '../styles/app.css';
@import 'monaco-editor/min/vs/editor/editor.main.css';
</style>

<template>
	<div v-if="app.loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
		<div class="transform scale-150">
			<Loading></Loading>
		</div>
	</div>

	<template v-if="app.loading == false">
		<main class="main">
			<slot></slot>
			<CoreEditor v-if="feature.editorVisible" :bubbleMenusEnable="feature.bubbleMenuVisible"
				:floatingMenusEnable="feature.floatingMenuVisible" :editor="editor" />
		</main>
	</template>

	<!-- Message -->
	<Message :plugins="config.plugins"></Message>

	<!-- Error -->
	<ErrorPage></ErrorPage>
</template>