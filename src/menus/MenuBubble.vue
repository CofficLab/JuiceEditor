<script lang="ts" setup>
import {
	RiBold, RiItalic, RiStrikethrough, RiPaletteLine, RiSubscript,
	RiSuperscript, RiUnderline, RiFontFamily, RiCodeLine, RiFontColor,
	RiKeyboardBoxLine, RiLinkM
} from '@remixicon/vue'
import {
	TiptapEditor, ImageExtension, FontFamilyExtension, LinkExtension, HeadingExtension,
	ParagraphExtension, ColorExtension, TiptapEditorState, TiptapEditorView, BubbleMenuExtension
} from '../model/TiptapGroup'
import ButtonGroup from '../ui/ButtonGroup.vue'
import MenuImage from './MenuImage.vue'
import MenuDraw from './MenuDraw.vue'
import MenuLink from './MenuLink.vue'
import { computed, ref } from 'vue'
import { shouldShowBubbleMenu, getSelectionTextLength } from '../extensions/SmartMenus'
import Button from '../ui/Button.vue'
import SmartText from '../extensions/SmartText'

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
	view: TiptapEditorView
	state: TiptapEditorState
	oldState?: TiptapEditorState | undefined
	from: number
	to: number
}) {
	return shouldShowBubbleMenu(props)
}

const hasSelection = computed(() => getSelectionTextLength(props.editor) > 0)
const shouldShowLinkMenu = ref(false)
const shouldShowDrawMenu = ref(false)
const shouldShowImageMenu = ref(false)
const shouldShowFontMenu = ref(false)
const shouldShowFormatMenu = ref(false)
const isEditing = ref(false)

props.editor.on('update', ({ editor }) => {
	if (editor.isEditable == false) {
		shouldShowLinkMenu.value = false
		shouldShowDrawMenu.value = false
		shouldShowImageMenu.value = false
		shouldShowFontMenu.value = false
		shouldShowFormatMenu.value = false
	}
})

props.editor.on('selectionUpdate', () => {
	if (isEditing.value) {
		return false
	}

	shouldShowLinkMenu.value = false
	shouldShowDrawMenu.value = false
	shouldShowImageMenu.value = false
	shouldShowFontMenu.value = false
	shouldShowFormatMenu.value = false

	setTimeout(() => {
		shouldShowLinkMenu.value = props.editor.isActive(LinkExtension.name)
		shouldShowDrawMenu.value = props.editor.getAttributes(ImageExtension.name).draw == true
		shouldShowFontMenu.value = props.editor.can().setFontFamily('inter') && !props.editor.isActive(LinkExtension.name)
		shouldShowImageMenu.value = props.editor.isActive(ImageExtension.name) && !props.editor.getAttributes(ImageExtension.name).draw
		shouldShowFormatMenu.value = [HeadingExtension.name, ParagraphExtension.name, SmartText.name].some(node => {
			return props.editor.isActive(node)
		}) && [LinkExtension.name].every(node => {
			return !props.editor.isActive(node)
		})
	}, 0)
})

const textColors = computed(() => {
	return props.editor.options.extensions.find(extension => extension.name === ColorExtension.name)?.options.colors
})

const fontFamilies = computed(() => {
	return props.editor.options.extensions.find(extension => extension.name === FontFamilyExtension.name)?.options.fontFamilies
})
</script>

<template>
	<BubbleMenuExtension :should-show="shouldShow" :tippy-options="{
		duration: 100,
		maxWidth: 800,
		placement: 'top',
		appendTo: 'parent',
		zIndex: 888
	}" :editor="editor">
		<!-- Heading And Format -->
		<ButtonGroup :backgroundClass="backgroundClass" direction="horizontal">
			<Button tips="加粗" :shape="shape" v-if="shouldShowFormatMenu"
				@click="editor.chain().focus().toggleBold().run()">
				<RiBold></RiBold>
			</Button>
			<Button tips="斜体" :shape="shape" v-if="hasSelection" @click="editor.chain().focus().toggleItalic().run()">
				<RiItalic></RiItalic>
			</Button>
			<Button tips="删除线" :shape="shape" v-if="hasSelection" @click="editor.chain().focus().toggleStrike().run()">
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
			<Button tips="链接" :shape="shape" v-if="hasSelection"
				@click="editor.chain().focus().toggleLink({ href: 'https://cofficlab.github.io' }).run()">
				<RiLinkM></RiLinkM>
			</Button>
			<Button tips="下划线" :shape="shape" v-if="hasSelection"
				@click="editor.chain().focus().toggleUnderline().run()">
				<RiUnderline></RiUnderline>
			</Button>
			<Button tips="行内代码" :shape="shape" v-if="hasSelection" @click="editor.chain().focus().toggleCode().run()">
				<RiCodeLine></RiCodeLine>
			</Button>
			<Button tips="快捷键" :shape="shape" v-if="hasSelection" @click="editor.chain().focus().toggleKbd().run()">
				<RiKeyboardBoxLine></RiKeyboardBoxLine>
			</Button>
			<Button tips="文字颜色" :shape="shape" v-if="hasSelection" dropdown-position="top"
				:dropdown-background-class="backgroundClass">
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
			<Button tips="字体" :shape="shape" v-if="shouldShowFontMenu" :dropdown-background-class="backgroundClass">
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

			<!-- Draw -->
			<MenuDraw :editor="editor" :background-class="backgroundClass" v-if="shouldShowDrawMenu"></MenuDraw>

			<!-- Image -->
			<MenuImage :editor="editor" :background-class="backgroundClass" v-if="shouldShowImageMenu"></MenuImage>

			<!-- Link -->
			<MenuLink :editor="editor" :background-class="backgroundClass" v-if="shouldShowLinkMenu"
				:on-edit-start="() => isEditing = true" :on-edit-end="() => isEditing = false"></MenuLink>
		</ButtonGroup>
	</BubbleMenuExtension>
</template>
