<script lang="ts" setup>
import { EditorContent } from '@tiptap/vue-3'
import { watch } from 'vue'
import BubbleMenus from '../menus/MenuBubble.vue'
import FloatMenus from '../menus/MenuFloat.vue'
import TiptapAgent from '../helper/TiptapHelper'
import BlockMenu from '../menus/MenuBlock.vue'
import EditorData from '../model/EditorData'
import Config from '../config/config'

const title = '📒 Tiptap'
const props = defineProps({
	content: {
		type: String,
		default: ''
	},
	editable: {
		type: Boolean,
		default: false
	},
	drawEnable: {
		required: true,
		type: Boolean,
		default: false
	},
	tableEnable: {
		type: Boolean,
		default: false,
		required: true
	},
	bubbleMenusEnable: {
		type: Boolean,
		default: true,
		required: true
	},
	floatingMenusEnable: {
		type: Boolean,
		default: true,
		required: true
	},
	onCreate: {
		type: Function,
		default: () => { }
	},
	onUpdate: {
		type: Function,
		default: () => {
			console.log('onUpdate')
		}
	},
	onSelectionUpdate: {
		type: Function,
		default: () => { }
	},
	onMessage: {
		type: Function,
		default: () => { }
	}
})

const editor = TiptapAgent.create({
	extensions: Config.extensions,
	content: props.content,
	editable: props.editable,
	drawEnable: props.drawEnable,
	tableEnable: props.tableEnable,
	onCreate: (doc: EditorData | Error) => {
		let verbose = false

		if (verbose) {
			console.log(title, "onCreate", doc)
		}

		props.onCreate(doc)
	},
	onUpdate: (data: EditorData | Error) => {
		let verbose = false

		if (verbose) {
			console.log(title, "OnUpdate", data)
		}

		if (!props.editable) {
			if (verbose) {
				console.log('只读模式，不回调更新')
			}

			return
		}

		props.onUpdate(data)
	},
	onSelectionUpdate(type) {
		props.onSelectionUpdate(type)
	}
})

const isDebug = false

watch(
	() => props.content,
	(newValue, oldValue) => {
		let verbose = false
		let verbose2 = false

		if (editor.getHTML() === newValue) {
			if (verbose2) {
				console.log(title, 'new content = editor content, ignore')
			}
			return
		}

		if (verbose) {
			console.log(title, 'content changed')
			console.log(oldValue)
			console.log(newValue)
		}

		editor.commands.setContent(props.content, true)
	}
)


</script>

<template>
	<div v-if="editor" class="editor-container">
		<BubbleMenus :editor="editor" v-if="editable && bubbleMenusEnable"></BubbleMenus>
		<FloatMenus :editor="editor" v-if="editable && floatingMenusEnable"></FloatMenus>
		<BlockMenu :editor="editor" class="absolute" />

		<div id="core" :class="{
			'bg-slate-300/10': isDebug,
			'md:bg-green-300/10': isDebug,
			'lg:bg-blue-300/10': isDebug,
			'xl:bg-purple-300/10': isDebug,
			'2xl:bg-red-300/10': isDebug,
			'px-4': true,
			'flex flex-row pt-4 pb-24': true,
			'justify-center': true
		}">
			<EditorContent :editor="editor" :class="{
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
				rounded: true
			}" class="container flex flex-col min-h-screen px-4 pb-48 prose-sm prose dark:prose-invert" />
		</div>
	</div>
</template>