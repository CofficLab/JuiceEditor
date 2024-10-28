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

		<div class="flex flex-row w-full justify-center gap-0">
			<SourceCode :editor="editor" v-if="showSourceCode" :class="{ 'w-1/2': true }" />
			<CoreEditor :editor="editor" :class="{ 'w-1/2': showSourceCode }" />
		</div>
	</main>
</template>
