<script lang="ts" setup>
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { BubbleMenu } from '@tiptap/vue-3'
import { Editor as TiptapEditor } from '@tiptap/core'
import ButtonGroup from '../ui/ButtonGroup.vue'
import MenuImage from './MenuImage.vue'
import MenuDraw from './MenuDraw.vue'
import MenuLink from './MenuLink.vue'
import FontFamily from '@tiptap/extension-font-family'
import { computed } from 'vue'
import { shouldShowBubbleMenu } from '../extensions/SmartMenus'
import Button from '../ui/Button.vue'
import { RiH2, RiH3, RiH4, RiH5, RiH6, RiText, RiBold, RiItalic, RiStrikethrough, RiChatQuoteLine, RiPlaneLine, RiPaletteLine, RiSubscript, RiSuperscript, RiUnderline, RiFontFamily, RiCodeBoxLine, RiCodeLine, RiFontColor } from '@remixicon/vue'
import Color from '@tiptap/extension-color'
import { getSelectionTextLength } from '../extensions/SmartSelection'
import Link from '@tiptap/extension-link'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'

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
	},
	backgroundClass: {
		type: String,
		required: false,
		default: 'bg-green-100/95 dark:bg-green-500/95'
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
	if (props.editor.isActive(Link.name)) {
		return false
	}

	const nodesShow = [Heading.name, Paragraph.name, Text.name]

	return nodesShow.some(node => {
		return props.editor.isActive(node)
	})
})

const shouldShowFormatMenu = computed(() => {
	if (props.editor.isActive(Link.name)) {
		return false
	}

	const nodesShow = [Heading.name, Paragraph.name, Text.name]

	return nodesShow.some(node => {
		return props.editor.isActive(node)
	})
})

const shouldShowDrawMenu = computed(() => {
	return props.editor.getAttributes(Image.name).draw == true
})

const shouldShowImageMenu = computed(() => {
	return props.editor.isActive(Image.name) && !props.editor.getAttributes(Image.name).draw
})

const shouldShowLinkMenu = computed(() => {
	return props.editor.isActive(Link.name)
})

const textColors = computed(() => {
	return props.editor.options.extensions.find(extension => extension.name === Color.name)?.options.colors
})

const fontFamilies = computed(() => {
	return props.editor.options.extensions.find(extension => extension.name === FontFamily.name)?.options.fontFamilies
})

const hasSelection = computed(() => {
	return getSelectionTextLength(props.editor) > 0
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
			<!-- Heading And Format -->
			<ButtonGroup :backgroundClass="backgroundClass" direction="horizontal"
				v-if="(shouldShowHeadingMenu || shouldShowFormatMenu)">



				<Button tips="加粗" :shape="shape" v-if="shouldShowFormatMenu"
					@click="editor.chain().focus().toggleBold().run()">
					<RiBold></RiBold>
				</Button>
				<Button tips="斜体" :shape="shape" v-if="hasSelection"
					@click="editor.chain().focus().toggleItalic().run()">
					<RiItalic></RiItalic>
				</Button>
				<Button tips="删除线" :shape="shape" v-if="hasSelection"
					@click="editor.chain().focus().toggleStrike().run()">
					<RiStrikethrough></RiStrikethrough>
				</Button>
				<Button tips="高亮" :shape="shape" v-if="hasSelection"
					@click="editor.chain().focus().toggleHighlight().run()">
					<RiPaletteLine></RiPaletteLine>
				</Button>
				<Button tips="下标" :shape="shape" v-if="hasSelection"
					@click="editor.chain().focus().toggleSubscript().run()">
					<RiSubscript></RiSubscript>
				</Button>
				<Button tips="上标" :shape="shape" v-if="hasSelection"
					@click="editor.chain().focus().toggleSuperscript().run()">
					<RiSuperscript></RiSuperscript>
				</Button>
				<Button tips="下划线" :shape="shape" v-if="hasSelection"
					@click="editor.chain().focus().toggleUnderline().run()">
					<RiUnderline></RiUnderline>
				</Button>
				<Button tips="行内代码" :shape="shape" v-if="hasSelection"
					@click="editor.chain().focus().toggleCode().run()">
					<RiCodeLine></RiCodeLine>
				</Button>
				<Button tips="文字颜色" :shape="shape" v-if="hasSelection" dropdown-position="top">
					<RiFontColor></RiFontColor>

					<template #dropdown-item>
						<div class="grid grid-cols-2 z-50 sm:grid-cols-3 md:grid-cols-5 gap-2 w-48">
							<div v-for="color in textColors" @click="editor.commands.setColor(color)" :class="{
								'w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1': true,
								'is-active': editor.isActive('textStyle', { color: color })
							}">
								<div class="w-5 h-5 rounded-full p-1" :style="{ backgroundColor: color }"></div>
							</div>

							<div @click="editor.chain().focus().unsetColor().run()" :class="{
								'w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1': true,

							}">
								<div class="w-5 h-5 rounded-full p-1 ring-1 scale-90"></div>
							</div>
						</div>
					</template>
				</Button>
				<Button tips="字体" :shape="shape" v-if="editor.can().setFontFamily('inter')">
					<RiFontFamily></RiFontFamily>

					<template #dropdown-item>
						<div class="grid z-50 grid-cols-1 gap-2 w-56">
							<div v-for="fontFamily in fontFamilies"
								@click="editor.chain().focus().setFontFamily(fontFamily).run()" :class="{
									'w-full h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 p-1': true,
									'is-active': editor.isActive('textStyle', { fontFamily: fontFamily })
								}">
								<div class="w-full h-5 p-1" :style="{ fontFamily: fontFamily }">{{ fontFamily
									}}</div>
							</div>

							<div @click="editor.chain().focus().unsetFontFamily().run()" :class="{
								'w-full h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 p-1': true,

							}">
								<div class="w-full h-5 p-1">默认值</div>
							</div>
						</div>
					</template>
				</Button>
			</ButtonGroup>

			<!-- Draw -->
			<ButtonGroup :backgroundClass="backgroundClass" v-if="shouldShowDrawMenu">
				<MenuDraw :editor="editor"></MenuDraw>
			</ButtonGroup>

			<!-- Image -->
			<ButtonGroup :backgroundClass="backgroundClass" v-if="shouldShowImageMenu">
				<MenuImage :editor="editor"></MenuImage>
			</ButtonGroup>

			<!-- Link -->
			<ButtonGroup :backgroundClass="backgroundClass" v-if="shouldShowLinkMenu">
				<MenuLink :editor="editor"></MenuLink>
			</ButtonGroup>
		</bubble-menu>
	</div>
</template>
