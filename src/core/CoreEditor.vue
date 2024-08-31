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
				'md:max-w-xl': shouldShowToc,
				'md:max-w-2xl': !shouldShowToc,
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

			<!-- TOC占位，宽度=TOC的宽度 -->
			<div :class="{
				'md:w-56': shouldShowToc,
				'4md:w-48': shouldShowToc,
				'xl:w-64': shouldShowToc,
				'2xl:w-88': shouldShowToc
			}"></div>

			<!-- TOC，和顶部留一些距离，因为WEB项目顶部有导航栏 -->
			<!-- <div id="toc" v-if="shouldShowToc" :class="{
				'md:bg-slate-300/10': false,
				'lg:bg-blue-300/50': isDebug,
				'xl:bg-purple-300/50': isDebug,
				'2xl:bg-red-300/50': isDebug,
				'fixed right-0 top-12 z-30': true,
				'flex-row justify-start hidden h-screen overflow-y-scroll': true,
				'w-48': true,
				'md:w-56 md:flex md:right-1': true,
				'4md:w-48 4md:right-2': true,
				'xl:w-64 4md:right-2': true,
				'2xl:w-88 2xl:right-24': true
			}">
				<div class="w-full my-12 overflow-y-scroll menu menu-xs">
					<HeadingVue :heading="h" v-for="h in headingTree.children"></HeadingVue>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script lang="ts" setup>
import { EditorContent } from '@tiptap/vue-3'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BubbleMenus from '../menus/BubbleMenus.vue'
import FloatMenus from '../menus/FloatMenus.vue'
import TiptapAgent from '../helper/TiptapHelper'
import EditorDoc from '../model/EditorDoc'
import HeadingVue from './Heading.vue'
import Heading from '../extensions/Toc/Heading'
import BlockMenu from '../menus/BlockMenu.vue'

const title = '📒 Tiptap'
const props = defineProps({
	uuid: {
		type: String,
		required: true,
		default: ''
	},
	drawLink: {
		type: String,
		default: '',
		required: true
	},
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
	uuid: props.uuid,
	content: props.content,
	editable: props.editable,
	drawIoLink: props.drawLink,
	drawEnable: props.drawEnable,
	tableEnable: props.tableEnable,
	onCreate: (data: EditorDoc) => {
		props.onCreate(data)
	},
	onUpdate: (data: EditorDoc) => {
		refreshToc('onUpdate')
		if (!props.editable) {
			return console.log('只读模式，不回调更新')
		}

		props.onUpdate(data)
	},
	onSelectionUpdate(type) {
		props.onSelectionUpdate(type)
	}
})

const isDebug = false
const headingTree = ref(new Heading())
const shouldShowToc = computed(() => {
	return false
	return editor.commands.hasToc() && headingTree
})

function refreshToc(reason: string) {
	console.log(title, '刷新TOC，因为', reason)
	headingTree.value = Heading.makeTree(editor) as unknown as Heading
}

watch(
	() => props.uuid,
	(newValue, oldValue) => {
		let verbose = false
		if (verbose) {
			console.log(title, 'uuid changed', oldValue, '->', newValue)
		}

		editor.setOptions({
			injectNonce: props.uuid
		})
	}
)

watch(
	() => props.content,
	(newValue, oldValue) => {
		let verbose = false
		if (verbose) {
			console.log(title, 'content changed')
		}

		if (editor.getHTML() === newValue) {
			// console.log('new content = editor content')
			return
		}

		editor.commands.setContent(props.content, true)
	}
)

onMounted(() => {
	refreshToc('onMounted')
})
</script>
