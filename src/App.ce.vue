<script setup lang="ts">
import PurePage from './pages/BasicPage.vue'
import NodePage from './pages/NodePage.vue'

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
</script>

<style>
@import './styles/app.css';
@import 'monaco-editor/min/vs/editor/editor.main.css';
</style>

<template>
	<PurePage :drawio="drawio" :readonly="readonly" v-if="page == 'basic'"></PurePage>
	<NodePage :drawio="drawio" :readonly="readonly" v-if="page == 'node'"></NodePage>
</template>