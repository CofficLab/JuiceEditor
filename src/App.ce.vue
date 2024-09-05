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

const app = useAppStore()
const doc = useDocStore()
const messageStore = useMessageStore()
const modeStore = useModeStore()
const loading = ref(true)

onMounted(() => {
	modeStore.setMode(props.mode)
	loading.value = false
})

// collect message from every store
watch(() => app.message, () => messageStore.setMessageText(app.message.text))
watch(() => doc.message, () => messageStore.setMessageText(doc.message.text))
</script>

<style>
@import './styles/app.css';
@import 'monaco-editor/min/vs/editor/editor.main.css';
</style>

<template v-if="loading==false">
	<BasicPage :drawio="drawio" :readonly="readonly" v-if="modeStore.isBasic()"
		:onMessage="messageStore.setMessageText">
	</BasicPage>
	<NodePage :drawio="drawio" :readonly="readonly" v-if="modeStore.isNode()" :onMessage="messageStore.setMessageText">
	</NodePage>
	<SlotPage :drawio="drawio" :readonly="readonly" v-if="modeStore.isSlot()" :onMessage="messageStore.setMessageText">
	</SlotPage>

	<Message></Message>
</template>