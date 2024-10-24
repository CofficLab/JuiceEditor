<script lang="ts" setup>
import { EditorContent } from '@tiptap/vue-3'
import BubbleMenus from '../menus/MenuBubble.vue'
import FloatMenus from '../menus/MenuFloat.vue'
import MenuLeft from '../menus/MenuLeft.vue'
import MenuRight from '../menus/MenuRight.vue'
import { Editor as EditorVue } from '@tiptap/vue-3'

defineProps({
	editor: {
		type: EditorVue,
		required: true
	},
	bubbleMenusEnable: {
		type: Boolean,
		default: true,
		required: false
	},
	floatingMenusEnable: {
		type: Boolean,
		default: true,
		required: false
	},
})

const isDebug = false

</script>

<template>
	<div v-if="editor" class="editor-container">
		<BubbleMenus :editor="editor" v-if="editor.isEditable && bubbleMenusEnable"></BubbleMenus>
		<FloatMenus :editor="editor" v-if="editor.isEditable && floatingMenusEnable"></FloatMenus>
		<MenuLeft :editor="editor" />
		<MenuRight :editor="editor" />

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
			<div :class="{
				'bg-slate-300/10': true,
				'md:bg-green-300/10': isDebug,
				'lg:bg-blue-300/10': isDebug,
				'xl:bg-purple-300/10': isDebug,
				'2xl:bg-red-300/10': isDebug,
				// 'md:max-w-xl': shouldShowToc,
				// 'md:max-w-2xl': !shouldShowToc,
				'md:px-0': true,
				'md:py-6': true,
				'lg:max-w-3xl': true,
				'lg:px-0': true,
				'lg:py-6': true,
				'xl:max-w-3xl': true,
				'xl:px-0': true,
				'xl:py-6': true,
				'2xl:max-w-4xl': true,
				'2xl:px-0': true,
				'2xl:py-8': true,
				'dark:bg-zinc-900/30': true,
				'shadow-inner': true,
				'rounded container flex flex-col min-h-screen pb-48 prose-sm prose dark:prose-invert': true
			}">
				<EditorContent :editor="editor" />

				<div class="w-full flex flex-col justify-end container mt-24 pr-8">
					<p class="text-xs text-gray-500 text-end">
						{{ editor.storage.characterCount.characters() }} 个字
					</p>
					<p class="text-xs text-gray-500 text-end">
						{{ editor.storage.characterCount.words() }} 个词
					</p>
				</div>
			</div>
		</div>
	</div>
</template>