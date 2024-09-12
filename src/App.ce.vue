<script setup lang="ts">
import { ref, watch } from 'vue';
import BasicPage from './pages/BasicPage.vue';
import NodePage from './pages/NodePage.vue'
import { useMessageStore } from './store/MessageStore'
import { useAppStore } from './store/AppStore';
import Message from './pages/Message.vue';
import SlotPage from './pages/SlotPage.vue';
import PageMode from './model/PageMode';
import { useModeStore } from './store/ModeStore';
import { onMounted } from 'vue';
import { useDocStore } from './store/DocStore';
import ErrorPage from './pages/ErrorPage.vue';
import { useNodeStore } from './store/NodeStore';
import { useDocsStore } from './store/DocsStore';
import { useRequestStore } from './store/RequestStore';
import ListenerProvider from './provider/ListenerProvider';
import ApiProvider from './provider/ApiProvider';
import Config from './config/config';
import { useFeatureStore } from './store/FeatureStore';
import PluginProvider from './provider/PluginProvider';
import Loading from './ui/Loading.vue'

const props = defineProps({
	drawio: {
		type: String,
		required: true
	},
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
const doc = useDocStore()
const messageStore = useMessageStore()
const modeStore = useModeStore()
const nodeStore = useNodeStore()
const docsStore = useDocsStore()
const feature = useFeatureStore()
const docStore = useDocStore()
const requestStore = useRequestStore()
const listenerProvider = new ListenerProvider(Config.listeners)
const apiProvider = new ApiProvider({
	featureProvider: feature,
	editorProvider: docStore,
	nodeProvider: nodeStore,
	docsProvider: docsStore,
	modeProvider: modeStore,
	requestProvider: requestStore
})
const pluginProvider = new PluginProvider(Config.plugins)

onMounted(() => {
	let verbose = true

	if (verbose) {
		console.log(title, 'onMounted, props.mode is', props.mode)
	}

	modeStore.setMode(props.mode, 'App.onMounted')
	listenerProvider.boot(modeStore.mode)
	apiProvider.boot()

	app.loading = false
})

// collect events from every store
watch(() => app.ready, () => {
	if (app.ready) {
		pluginProvider.onReady(modeStore.mode)
	}
})
watch(() => docStore.getDoc(), () => pluginProvider.onDocUpdated(docStore.getDoc()), { deep: true })

// collect message from every store
watch(() => app.message.uuid, () => messageStore.setMessage(app.message))
watch(() => doc.message.uuid, () => messageStore.setMessage(doc.message))

// collect error from every store
watch(() => app.error, () => messageStore.setError(app.error))
watch(() => doc.error, () => messageStore.setError(doc.error), { deep: true })
</script>

<style>
@import './styles/app.css';
@import 'monaco-editor/min/vs/editor/editor.main.css';
</style>

<template>
	<Loading v-if="app.loading"></Loading>

	<template v-if="app.loading == false">
		<BasicPage :drawio="drawio" :readonly="readonly" v-if="modeStore.isBasic()"
			:onMessage="messageStore.setMessage">
		</BasicPage>
		<NodePage :drawio="drawio" :readonly="readonly" :pluginProvider="pluginProvider" v-if="modeStore.isNode()"
			:onMessage="messageStore.setMessage">
		</NodePage>
		<SlotPage :drawio="drawio" :readonly="readonly" :pluginProvider="pluginProvider" v-if="modeStore.isSlot()"
			:onMessage="messageStore.setMessage">
		</SlotPage>
		<p v-else>mode: {{ modeStore.mode.type }}</p>
	</template>

	<!-- Message -->
	<Message></Message>

	<!-- Error -->
	<ErrorPage></ErrorPage>
</template>