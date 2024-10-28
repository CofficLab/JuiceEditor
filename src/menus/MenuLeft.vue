<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import TiptapEditor from '../model/TiptapEditor'
import Button from '../ui/Button.vue'
import ButtonGroup from '../ui/ButtonGroup.vue'
import { getFirstActiveNodePosition } from '../extensions/SmartActive'
import {
	RiDeleteBin7Line, RiAddLine, RiCodeBoxLine,
	RiAlignLeft, RiAlignCenter, RiPaletteLine,
	RiGlobalLine, RiCornerDownLeftLine, RiDivideLine, RiAlignRight,
	RiH2, RiH3, RiH4, RiH5, RiH6, RiText, RiChatQuoteLine
} from '@remixicon/vue'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import { Toc } from '../extensions/Toc/Toc'

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
		required: true,
		default: 'bg-indigo-100/95 dark:bg-indigo-500/95'
	}
})

const emoji = '🐱 LeftMenu'
const editor = computed(() => props.editor)
const visible = ref(false)
const marginLeft = ref(0)
const scrollTop = ref(0)

let colorClass = computed(() => {
	return props.editor.options.extensions.find(extension => extension.name === 'paragraph')?.options.colorClass
})

let languages = computed(() => {
	return props.editor.options.extensions.find(extension => extension.name === 'paragraph')?.options.languages
})

watch(
	editor,
	(val) => {
		if (val) {
			editor.value.on('selectionUpdate', () => {
				let verbose = false

				if (verbose) {
					console.log(emoji, 'selectionUpdate')
				}

				updateMenuPosition()
			})
			editor.value.on('focus', () => {
				let verbose = false

				if (verbose) {
					console.log(emoji, 'focus')
				}

				updateMenuPosition()
			})
		} else {
			visible.value = false
		}
	},
	{ immediate: true }
)

function updateMenuPosition() {
	let verbose = false
	let editorDom = props.editor.view.dom

	if (!editorDom) {
		throw new Error('editorDom is null')
	}

	// 如果是只读模式，不显示
	if (props.editor.isEditable == false) {

		visible.value = false
		return
	}

	// 如果是TOC，不显示
	if (props.editor.isActive(Toc.name)) {
		visible.value = false
		return
	}

	let { offsetLeft } = editorDom as HTMLElement

	// 减去的是menu自身的宽度
	marginLeft.value = offsetLeft - 56

	const { offsetTop } = getFirstActiveNodePosition(editor.value)

	if (verbose) {
		console.log(emoji, "offsetTop", offsetTop)
	}

	if (offsetTop === null) {
		return
	}

	visible.value = true
	scrollTop.value = offsetTop - 24
}

function shouldShowParagraphMenu() {
	return props.editor.isActive(Paragraph.name)
}
</script>

<template>
	<div v-if="visible" :style="`transform: translate(${marginLeft}px, ${scrollTop}px);`" class="w-22 absolute z-50">
		<ButtonGroup direction="vertical" :backgroundClass="backgroundClass">
			<Button tips="删除" @click="editor.commands.deleteSelectionNode()"
				v-if="!editor.isActive(Heading.name, { level: 1 })" :shape="shape">
				<RiDeleteBin7Line :size="iconSize"></RiDeleteBin7Line>
			</Button>

			<Button tips="增加一行" v-if="!editor.isActive(Heading.name, { level: 1 })"
				@click="editor.commands.addBlankLineAfterSelection()" :shape="shape">
				<RiAddLine :size="iconSize"></RiAddLine>
			</Button>

			<Button tips="2号标题" v-if="editor.can().setHeading2() && !editor.isActive(Heading.name, { level: 1 })"
				:shape="shape" @click="editor.chain().focus().setHeading({ level: 2 }).run()">
				<RiH2></RiH2>
			</Button>
			<Button tips="3号标题" v-if="editor.can().setHeading3() && !editor.isActive(Heading.name, { level: 1 })"
				:shape="shape" @click="editor.chain().focus().setHeading3().run()">
				<RiH3></RiH3>
			</Button>
			<Button tips="4号标题" v-if="editor.can().setHeading4() && !editor.isActive(Heading.name, { level: 1 })"
				:shape="shape" @click="editor.chain().focus().setHeading4().run()">
				<RiH4></RiH4>
			</Button>
			<Button tips="正文" :iconSize="iconSize" :shape="shape"
				v-if="editor.can().setParagraph() && !editor.isActive(Heading.name, { level: 1 })"
				@click="editor.chain().focus().setParagraph().run()">
				<RiText></RiText>
			</Button>
			<Button tips="引用" :shape="shape"
				v-if="editor.isActive(Paragraph.name) && !editor.isActive(Heading.name, { level: 1 })"
				@click="editor.chain().focus().toggleBlockquote().run()">
				<RiChatQuoteLine></RiChatQuoteLine>
			</Button>

			<Button tips="代码块" :shape="shape" v-if="editor.can().toggleCodeBlock() && editor.isActive(Paragraph.name)"
				@click="editor.chain().focus().toggleCodeBlock().run()">
				<RiCodeBoxLine></RiCodeBoxLine>
			</Button>
			<!-- <Button tips="往左移动" @click="editor.commands.moveLeft()" :shape="shape">
				<RiIndentDecrease :size="iconSize"></RiIndentDecrease>
			</Button>

			<Button tips="居中对齐" @click="editor.commands.moveCenter()" :shape="shape">
				<RiAlignCenter :size="iconSize"></RiAlignCenter>
			</Button>

			<Button tips="往右移动" @click="editor.commands.moveRight()" :shape="shape">
				<RiIndentIncrease :size="iconSize"></RiIndentIncrease>
			</Button> -->

			<Button tips="文字靠左" @click="editor.commands.setTextAlign('left')" :shape="shape"
				v-if="editor.isActive(Paragraph.name) || editor.isActive(Heading.name)">
				<RiAlignLeft :size="iconSize"></RiAlignLeft>
			</Button>

			<Button tips="文字居中" @click="editor.commands.setTextAlign('center')" :shape="shape"
				v-if="editor.isActive(Paragraph.name) || editor.isActive(Heading.name)">
				<RiAlignCenter :size="iconSize"></RiAlignCenter>
			</Button>

			<Button tips="文字靠右" @click="editor.commands.setTextAlign('right')" :shape="shape"
				v-if="editor.isActive(Paragraph.name) || editor.isActive(Heading.name)">
				<RiAlignRight :size="iconSize"></RiAlignRight>
			</Button>

			<!-- Menu for paragraph -->

			<Button tips="样式" :shape="shape" v-if="shouldShowParagraphMenu()"
				:dropdownBackgroundClass="backgroundClass">
				<RiPaletteLine :size="iconSize"></RiPaletteLine>
				<template #dropdown-item>
					<div class="grid grid-cols-2 z-50 sm:grid-cols-3 md:grid-cols-5 gap-2 w-48">
						<div v-for="color in Object.keys(colorClass)"
							class="w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
							:key="color" @click="props.editor.commands.setBackgroundColor(color)">
							<div :class="colorClass[color]" class="w-5 h-5 rounded-full p-1"></div>
						</div>
					</div>
				</template>
			</Button>

			<Button tips="翻译" :shape="shape" v-if="shouldShowParagraphMenu()"
				:dropdownBackgroundClass="backgroundClass">
				<RiGlobalLine :size="iconSize"></RiGlobalLine>

				<template #dropdown-item>
					<div class="grid grid-cols-2 z-50 sm:grid-cols-1 md:grid-cols-2 gap-2 w-24">
						<div v-for="language in languages" @click="props.editor.commands.translate(language)">
							<Button shape="rectangle" class="w-12 h-8">{{ language }}</Button>
						</div>
					</div>
				</template>
			</Button>

			<!-- <Button tips="空白行" v-if="!editor.isActive(Heading.name, { level: 1 })"
				@click="editor.commands.setHardBreak()" :shape="shape">
				<RiCornerDownLeftLine :size="iconSize"></RiCornerDownLeftLine>
			</Button> -->

			<!-- <Button tips="分割线" v-if="!editor.isActive(Heading.name, { level: 1 })"
				@click="editor.commands.setHorizontalRule()" :shape="shape">
				<RiDivideLine :size="iconSize"></RiDivideLine>
			</Button> -->
		</ButtonGroup>
	</div>
</template>
