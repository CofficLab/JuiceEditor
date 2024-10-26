<script setup lang="ts">
import { computed } from 'vue';
import CoreEditor from './CoreEditor.vue'
import { Editor } from '@tiptap/vue-3';
import SourceCode from './SourceCode.vue'
const props = defineProps({
	editor: {
		type: Editor,
		required: true
	}
})

const showSourceCode = computed(() => {
	return props.editor.storage.sourceCode.shouldShow
})

</script>

<template>
	<main class="main text-left">
		<slot></slot>
		<SourceCode :editor="editor" v-if="showSourceCode" />
		<CoreEditor :editor="editor" v-else />
	</main>
</template>
