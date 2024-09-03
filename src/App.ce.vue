<script setup lang="ts">
import BasicPage from './pages/BasicPage.vue';
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
	<BasicPage :drawio="drawio" :readonly="readonly" v-if="page == 'basic'"></BasicPage>
	<NodePage :drawio="drawio" :readonly="readonly" v-if="page == 'node'"></NodePage>
</template>