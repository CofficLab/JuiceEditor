<script setup lang="ts">
import { watch, onUnmounted } from 'vue';
import CoreEditor from './CoreEditor.vue'
import { Editor } from '@tiptap/vue-3';

const props = defineProps({
	editor: {
		type: Editor,
		required: true
	}
})

watch(() => props.editor, () => {
	console.log('editor changed')
})

onUnmounted(() => {
	console.log("onUnmounted")
})

</script>

<template>
	<main class="main">
		<slot></slot>
		<CoreEditor :editor="editor" />
	</main>
</template>
