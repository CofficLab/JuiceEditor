<script lang="ts" setup>
import { EditorContent, Editor as EditorVue } from '@tiptap/vue-3'
import BubbleMenus from '../menus/MenuBubble.vue'
import FloatMenus from '../menus/MenuFloat.vue'
import MenuLeft from '../menus/MenuLeft.vue'
import MenuRight from '../menus/MenuRight.vue'
import { nextTick, onMounted } from 'vue'

const props = defineProps({
	editor: {
		type: EditorVue,
		required: true
	},
	backgroundClass: {
		type: String,
		default: 'bg-slate-300/10 dark:bg-zinc-900/30'
	},
	menuBackgroundClass: {
		type: String,
		required: false,
		default: 'bg-slate-200 dark:bg-zinc-900/95'
	},
	onEditorMounted: {
		type: Function,
		required: false
	}
})

const isDebug = false

onMounted(() => {
	nextTick(() => {
		props.onEditorMounted?.()
	})
})
</script>

<template>
	<div v-if="editor" id="core-container" class="flex flex-col w-full">
		<BubbleMenus :backgroundClass="menuBackgroundClass" :editor="editor"></BubbleMenus>
		<FloatMenus :background-class="menuBackgroundClass" :editor="editor"></FloatMenus>
		<MenuLeft :editor="editor" :backgroundClass="menuBackgroundClass" />
		<MenuRight :editor="editor" :backgroundClass="menuBackgroundClass" />

		<div id="core" :class="{
			'bg-slate-300/10': isDebug,
			'md:bg-green-300/10': isDebug,
			'lg:bg-blue-300/10': isDebug,
			'xl:bg-purple-300/10': isDebug,
			'2xl:bg-red-300/10': isDebug,
			'px-4': true,
			'flex flex-col pt-4 pb-24': true,
			'justify-center items-center': true
		}">
			<div id="editor-container" :class="{
				'md:bg-green-300/10': isDebug,
				'lg:bg-blue-300/10': isDebug,
				'xl:bg-purple-300/10': isDebug,
				'2xl:bg-red-300/10': isDebug,
				'md:px-0 md:py-6': true,
				'lg:max-w-3xl lg:px-0 lg:py-6': true,
				'xl:max-w-3xl xl:px-0 xl:py-6': true,
				'2xl:max-w-4xl 2xl:px-0 2xl:py-8': true,
				[backgroundClass]: true,
				'shadow-inner': true,
				'prose dark:prose-invert prose-sm': true,
				'rounded container flex flex-col min-h-screen pb-48': true
			}">
				<EditorContent id="editor-content" :editor="editor" />
				<div id="editor-footer" class="w-full flex flex-col justify-end container mt-24 pr-8">
					<p class="text-xs text-gray-500 text-end">
						{{ editor.storage.characterCount.characters() }} 个字 ｜ {{ editor.storage.characterCount.words()
						}}
						个词
					</p>
				</div>
			</div>
		</div>
	</div>
</template>