<script setup lang="ts">
import { watch, onUnmounted, ref } from 'vue';
import CoreEditor from './CoreEditor.vue'
import { Editor } from '@tiptap/vue-3';
import SourceCode from './SourceCode.vue'
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

const showSourceCode = ref(false)

function toggleSourceCode() {
	showSourceCode.value = !showSourceCode.value
}

</script>

<template>
	<main class="main text-left">
		<slot></slot>
		<CoreEditor :editor="editor" />
		<div class="h-48 w-full" @dblclick="toggleSourceCode"></div>
		<SourceCode :editor="editor" v-if="showSourceCode" />
	</main>
</template>
