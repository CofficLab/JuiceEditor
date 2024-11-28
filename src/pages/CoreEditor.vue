<script lang="ts" setup>
import { EditorContent, Editor as EditorVue } from '@tiptap/vue-3'
import BubbleMenus from '../menus/MenuBubble.vue'
import FloatMenus from '../menus/MenuFloat.vue'
import MenuLeft from '../menus/MenuLeft.vue'
import MenuRight from '../menus/MenuRight.vue'
import SourceCode from './SourceCode.vue'
import { computed, nextTick, onMounted, ref } from 'vue'
import { SmartMenusStorage } from '../extensions/SmartMenus'
import { SmartBackgroundStorage } from '../extensions/SmartBackground'
import { CharacterCountStorage } from '@tiptap/extension-character-count'
import { SourceCodeStorage } from '../extensions/SourceCode'

const props = defineProps({
	editor: {
		type: EditorVue,
		required: true
	}
})

const isDebug = false
const smartMenus = props.editor.storage.smartMenus as SmartMenusStorage
const smartBackground = props.editor.storage.smartBackground as SmartBackgroundStorage
const characterCount = props.editor.storage.characterCount as CharacterCountStorage
const menuColor = computed(() => smartMenus.color)
const backgroundClass = ref(smartBackground.backgroundClass)
const showSourceCode = computed(() => {
	const sourceCode = props.editor.storage.sourceCode as SourceCodeStorage
	return sourceCode.shouldShow
})

props.editor.on('update', ({ editor }) => {
	backgroundClass.value = smartBackground.backgroundClass
})

</script>

<template>
	<div v-if="editor" id="core-container" class="flex flex-col w-full">
		<BubbleMenus :background-class="menuColor" :editor="editor"></BubbleMenus>
		<FloatMenus :background-class="menuColor" :editor="editor"></FloatMenus>
		<MenuLeft :editor="editor" :background-class="menuColor" />
		<MenuRight :editor="editor" :background-class="menuColor" />

		<div id="core" :class="{
			'bg-slate-300/10': isDebug,
			'md:bg-green-300/10': isDebug,
			'lg:bg-blue-300/10': isDebug,
			'xl:bg-purple-300/10': isDebug,
			'2xl:bg-red-300/10': isDebug,
			'px-4': true,
			'flex flex-row pt-4 pb-24 gap-2': true,
			'justify-center items-center': true
		}">
			<SourceCode :editor="editor" v-if="showSourceCode" :class="{ 'w-1/2': true }" />

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
						{{ characterCount.characters() }} 个字 ｜ {{ characterCount.words() }}
						个词
					</p>
				</div>
			</div>
		</div>
	</div>
</template>