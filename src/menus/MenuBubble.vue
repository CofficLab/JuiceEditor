<script lang="ts" setup>
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { BubbleMenu } from '@tiptap/vue-3'
import { Editor as TiptapEditor } from '@tiptap/core'
import ButtonBar from '../ui/ButtonBar.vue'
import { HEADING, IMAGE, PARAGRAPH, TEXT, LINK } from '../config/nodes'
import MenuImage from './MenuImage.vue'
import MenuDraw from './MenuDraw.vue'
import MenuLink from './MenuLink.vue'
import { computed } from 'vue'
import { shouldShowBubbleMenu } from '../extensions/SmartMenus'
import Button from '../ui/Button.vue'
import { RiH2, RiH3, RiH4, RiH5, RiH6, RiText, RiBold, RiItalic, RiStrikethrough, RiChatQuoteLine } from '@remixicon/vue'

const props = defineProps({
	editor: {
		type: TiptapEditor,
		required: true
	},
	iconSize: {
		type: String,
		default: '24px'
	},
	shape: {
		type: String,
		default: 'rectangle'
	}
})

const shouldShow = function (props: {
	editor: TiptapEditor
	view: EditorView
	state: EditorState
	oldState?: EditorState | undefined
	from: number
	to: number
}) {
	return shouldShowBubbleMenu(props)
}

const shouldShowHeadingMenu = computed(() => {
	if (props.editor.isActive(LINK)) {
		return false
	}

	const nodesShow = [HEADING, PARAGRAPH, TEXT]

	return nodesShow.some(node => {
		return props.editor.isActive(node)
	})
})

const shouldShowFormatMenu = computed(() => {
	if (props.editor.isActive(LINK)) {
		return false
	}

	const nodesShow = [HEADING, PARAGRAPH, TEXT]

	return nodesShow.some(node => {
		return props.editor.isActive(node)
	})
})

const shouldShowDrawMenu = computed(() => {
	return props.editor.getAttributes(IMAGE).draw == true
})

const shouldShowImageMenu = computed(() => {
	return props.editor.isActive(IMAGE) && !props.editor.getAttributes(IMAGE).draw
})

const shouldShowLinkMenu = computed(() => {
	return props.editor.isActive(LINK)
})
</script>

<template>
	<!-- 选中后弹出的菜单 -->
	<div>
		<bubble-menu :should-show="shouldShow" :tippy-options="{
			duration: 100,
			maxWidth: 800,
			placement: 'top',
			appendTo: 'parent',
			zIndex: 888
		}" :editor="editor">
			<p class="text-xs prose dark:prose-invert rounded-md bg-white dark:bg-gray-800 px-2 py-1 inline-block mb-2">
				Bubble
			</p>

			<!-- Heading And Format -->
			<ButtonBar v-if="(shouldShowHeadingMenu || shouldShowFormatMenu)">
				<Button tips="2号标题" v-if="shouldShowHeadingMenu" :shape="shape"
					@click="editor.chain().focus().setHeading({ level: 2 }).run()">
					<RiH2></RiH2>
				</Button>
				<Button tips="3号标题" v-if="shouldShowHeadingMenu" :shape="shape"
					@click="editor.chain().focus().setHeading({ level: 3 }).run()">
					<RiH3></RiH3>
				</Button>
				<Button tips="4号标题" v-if="shouldShowHeadingMenu" :shape="shape"
					@click="editor.chain().focus().setHeading({ level: 4 }).run()">
					<RiH4></RiH4>
				</Button>
				<Button tips="5号标题" v-if="shouldShowHeadingMenu" :shape="shape"
					@click="editor.chain().focus().setHeading({ level: 5 }).run()">
					<RiH5></RiH5>
				</Button>
				<Button tips="6号标题" v-if="shouldShowHeadingMenu" :shape="shape"
					@click="editor.chain().focus().setHeading({ level: 6 }).run()">
					<RiH6></RiH6>
				</Button>
				<Button tips="正文" :iconSize="iconSize" :shape="shape" v-if="shouldShowFormatMenu"
					@click="editor.chain().focus().setParagraph().run()">
					<RiText></RiText>
				</Button>
				<Button tips="引用" :shape="shape" v-if="shouldShowFormatMenu"
					@click="editor.chain().focus().toggleBlockquote().run()">
					<RiChatQuoteLine></RiChatQuoteLine>
				</Button>
				<Button tips="加粗" :shape="shape" v-if="shouldShowFormatMenu"
					@click="editor.chain().focus().toggleBold().run()">
					<RiBold></RiBold>
				</Button>
				<Button tips="斜体" :shape="shape" v-if="shouldShowFormatMenu"
					@click="editor.chain().focus().toggleItalic().run()">
					<RiItalic></RiItalic>
				</Button>
				<Button tips="删除线" :shape="shape" v-if="shouldShowFormatMenu"
					@click="editor.chain().focus().toggleStrike().run()">
					<RiStrikethrough></RiStrikethrough>
				</Button>
			</ButtonBar>

			<!-- Draw -->
			<ButtonBar v-if="shouldShowDrawMenu">
				<MenuDraw :editor="editor"></MenuDraw>
			</ButtonBar>

			<!-- Image -->
			<ButtonBar v-if="shouldShowImageMenu">
				<MenuImage :editor="editor"></MenuImage>
			</ButtonBar>

			<!-- Link -->
			<ButtonBar v-if="shouldShowLinkMenu">
				<MenuLink :editor="editor"></MenuLink>
			</ButtonBar>
		</bubble-menu>
	</div>
</template>
