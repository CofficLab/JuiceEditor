<script setup lang="ts">
import { useAppStore } from './provider/AppStore'
import { useFeatureStore } from './provider/FeatureStore'
import Loading from './ui/Loading.vue'
import { onMounted } from 'vue'
import Message from './ui/Message.vue'
import URLHelper from './helper/URLHelper'
import AllApi from './api/AllApi'
import CoreEditor from './core/CoreEditor.vue'
import TreeNode from './model/TreeNode'
import Config from './config/config'
import Children from './core/Children.vue'
import { useMessageStore } from './provider/MessageProvider'

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

const targetNode = document.querySelector(Config.editorLabel)!
const config = { childList: true, subtree: true, characterData: true }
const observer = new MutationObserver(setEditorContent)
const feature = useFeatureStore()
const app = useAppStore()
const messageStore = useMessageStore()
window.api = new AllApi(feature, app)
const api = window.api
const children: TreeNode[] = []

observer.observe(targetNode, config)

onMounted(() => {
	app.drawLink = props.drawio
	feature.editable = !props.readonly

	setEditorContent()

	// 监听 URL 变化
	window.onpopstate = URLHelper.onURLChanged
})

function setEditorContent() {
	let content = document.querySelector(Config.editorLabel)!.innerHTML
	api.node.setContent(content)

	app.loading = false
	app.setReady()

	observer.disconnect()
	targetNode.innerHTML = ''
	observer.observe(targetNode, config)
}
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
