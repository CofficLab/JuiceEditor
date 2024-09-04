<script setup lang="ts">
import { watch } from 'vue';
import BasicPage from './pages/BasicPage.vue';
import NodePage from './pages/NodePage.vue'
import { useMessageStore } from './store/MessageStore'
import PluginProvider from './provider/PluginProvider'
import { Config } from './config/config';
import { useAppStore } from './store/AppStore';
import Message from './pages/Message.vue';

defineProps({
	drawio: {
		type: String,
		required: true
	},
	readonly: {
		type: Boolean,
		default: false
	},
	page: {
		type: String as () => 'node' | 'basic', // 限定可能的值
		required: false,
		default: 'node'
	}
})

const app = useAppStore()
const pluginProvider = new PluginProvider(Config.plugins)
const messageStore = useMessageStore()

watch(() => app.ready, () => pluginProvider.onReadyChange())
watch(() => app.message, () => messageStore.setMessageText(app.message.text))

</script>

<style>
@import './styles/app.css';
@import 'monaco-editor/min/vs/editor/editor.main.css';
</style>

<template>
	<BasicPage :drawio="drawio" :readonly="readonly" v-if="page == 'basic'" :onMessage="messageStore.setMessageText">
	</BasicPage>
	<NodePage :drawio="drawio" :readonly="readonly" v-if="page == 'node'" :onMessage="messageStore.setMessageText">
	</NodePage>

	<Message></Message>
</template>