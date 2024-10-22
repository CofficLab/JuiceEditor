<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Editor } from '@tiptap/core'
import Button from '../ui/Button.vue'
import TiptapHelper from '../helper/TiptapHelper'
import { HEADING, PARAGRAPH, TOC } from '../config/nodes'
import ButtonList from '../ui/ButtonList.vue'
import { RiDeleteBin7Line, RiAddLine, RiIndentDecrease, RiIndentIncrease, RiAlignCenter, RiPaletteLine, RiGlobalLine } from '@remixicon/vue'

const props = defineProps({
	editor: {
		type: Editor,
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

const emoji = '🐱 BlockMenu'
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
			// editor.value.on('blur', () => {
			// 	let verbose = false

			// 	if (verbose) {
			// 		console.log(emoji, 'blur')
			// 	}

			// 	visible.value = false
			// 	updateMenuPosition()
			// })
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
	if (props.editor.isActive(TOC)) {
		visible.value = false
		return
	}

	// 如果是Heading，且Level=1，不显示
	if (props.editor.isActive(HEADING) && props.editor.getAttributes(HEADING).level === 1) {
		visible.value = false
		return
	}

	let { offsetLeft } = editorDom as HTMLElement

	// 减去的是menu自身的宽度
	marginLeft.value = offsetLeft - 56

	const { offsetTop } = TiptapHelper.getFocusedNodePosition(editor.value)

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
	return props.editor.isActive(PARAGRAPH)
}

function shouldShowNewLineMenu() {
	return !props.editor.isActive(HEADING)
}
</script>

<template>
	<div v-if="visible" :style="`transform: translate(${marginLeft}px, ${scrollTop}px);`" class="w-22">
		<ButtonList>
			<Button tips="删除" @click="editor.commands.deleteSelectionNode()" :shape="shape">
				<RiDeleteBin7Line :size="iconSize"></RiDeleteBin7Line>
			</Button>

			<Button tips="增加一行" @click="editor.commands.addBlankLineAfterSelection()" v-if="shouldShowNewLineMenu()"
				:shape="shape">
				<RiAddLine :size="iconSize"></RiAddLine>
			</Button>

			<Button tips="往左移动" @click="editor.commands.moveLeft()" :shape="shape">
				<RiIndentDecrease :size="iconSize"></RiIndentDecrease>
			</Button>

			<Button tips="居中对齐" @click="editor.commands.moveCenter()" :shape="shape">
				<RiAlignCenter :size="iconSize"></RiAlignCenter>
			</Button>

			<Button tips="往右移动" @click="editor.commands.moveRight()" :shape="shape">
				<RiIndentIncrease :size="iconSize"></RiIndentIncrease>
			</Button>

			<!-- Menu for paragraph -->

			<Button tips="样式" :shape="shape" v-if="shouldShowParagraphMenu()">
				<RiPaletteLine :size="iconSize"></RiPaletteLine>

				<template #dropdown-item>
					<div v-for="color in Object.keys(colorClass)"
						class="w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
						:key="color" @click="props.editor.commands.setBackgroundColor(color)">
						<div :class="colorClass[color]" class="w-5 h-5 rounded-full p-1"></div>
					</div>
				</template>
			</Button>

			<Button tips="翻译" :shape="shape" v-if="shouldShowParagraphMenu()">
				<RiGlobalLine :size="iconSize"></RiGlobalLine>

				<template #dropdown-item>
					<div v-for="language in languages" @click="props.editor.commands.translate(language)">
						<Button size="xl" shape="square">{{ language }}</Button>
					</div>
				</template>
			</Button>
		</ButtonList>
	</div>
</template>
