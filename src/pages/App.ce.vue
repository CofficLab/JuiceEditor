<script setup lang="ts">
import { useMessageStore } from '../store/MessageStore'
import { useAppStore } from '../store/AppStore';
import Message from './Message.vue';
import PageMode from '../model/PageMode';
import { useModeStore } from '../store/ModeStore';
import { onMounted, onBeforeUnmount, watch } from 'vue';
import ErrorPage from './ErrorPage.vue';
import { useRequestStore } from '../store/RequestStore';
import ListenerProvider from '../provider/ListenerProvider';
import ApiProvider from '../provider/ApiProvider';
import Config from '../config/config';
import { useFeatureStore } from '../store/FeatureStore';
import PluginProvider from '../provider/PluginProvider';
import Loading from '../ui/Loading.vue'
import TiptapAgent from '../helper/TiptapHelper'
import EditorData from '../model/EditorData'
import CoreEditor from './CoreEditor.vue'
import { AppProps } from '../model/AppProps'

const props = defineProps(AppProps)

const title = "💻 App"
const app = useAppStore()
const messageStore = useMessageStore()
const modeStore = useModeStore()
const feature = useFeatureStore()
const requestStore = useRequestStore()

// init editor

const editor = TiptapAgent.create({
	extensions: Config.extensions,
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
	editor: editor
})
const listenerProvider = new ListenerProvider(Config.listeners)
const pluginProvider = new PluginProvider(Config.plugins)

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

function handleTranslationError(error: any) {
	messageStore.setError(error)
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
	<Message></Message>

	<!-- Error -->
	<ErrorPage></ErrorPage>
</template>