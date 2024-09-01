<script setup lang="ts">
import { useAppStore } from './provider/AppStore'
import { useFeatureStore } from './provider/FeatureStore'
import Loading from './ui/Loading.vue'
import { onMounted } from 'vue'
import Message from './ui/Message.vue'
import AllApi from './api/AllApi'
import CoreEditor from './core/CoreEditor.vue'
import TreeNode from './model/TreeNode'
import Config from './config/config'
import Children from './core/Children.vue'
import { useMessageStore } from './provider/MessageProvider'
import { watch } from 'vue'

const props = defineProps({
	drawio: {
		type: String,
		required: true
	},
	readonly: {
		type: Boolean,
		default: false
	}
})

const feature = useFeatureStore()
const app = useAppStore()
const messageStore = useMessageStore()
const children: TreeNode[] = []

onMounted(() => {
	app.drawLink = props.drawio
	feature.editable = !props.readonly

	app.hideLoading()

	window.api = new AllApi(feature, app)
	Config.listeners.forEach(l => l.start())
})

watch(() => app.message.uuid, () => {
	messageStore.setMessage(app.message.text)
})

</script>

<style>
@import './styles/app.css';
@import 'monaco-editor/min/vs/editor/editor.main.css';
</style>

<template>
	<main class="main">
		<slot></slot>

		<Loading v-if="app.loading"></Loading>

		<CoreEditor v-if="feature.editorVisible" :content="app.getContent()" :editable="feature.editable"
			:tableEnable="feature.tableEnabled" :drawEnable="feature.drawEnabled" :drawLink="app.drawLink"
			:bubbleMenusEnable="feature.bubbleMenuVisible" :floatingMenusEnable="feature.floatingMenuVisible"
			:onUpdate="app.setDoc" :onMessage="messageStore.setMessage" :uuid="app.getCurrentDocUUID()" />

		<Children v-if="children.length > 0" :children="children"></Children>

		<Message :message="messageStore.message" type="tips" :uuid="messageStore.uuid"></Message>
	</main>
</template>
