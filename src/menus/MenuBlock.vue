<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Editor, NodePos } from '@tiptap/core'
import ButtonBar from '../ui/ButtonBar.vue'
import Button from '../ui/Button.vue'
import IconDelete from '../ui/icons/Delete.vue'
import IconNewLine from '../ui/icons/IconNewLine.vue'
import TiptapHelper from '../helper/TiptapHelper'
import { HEADING, PARAGRAPH, TOC } from '../config/nodes'
import MenuParagraph from './MenuParagraph.vue'
import ButtonList from '../ui/ButtonList.vue'
const props = defineProps({
	editor: {
		type: Editor,
		required: true
	}
})

const emoji = '🐱 BlockMenu'
const editor = computed(() => props.editor)
const visible = ref(false)
const marginLeft = ref(0)
const scrollTop = ref(0)

watch(
	editor,
	(val) => {
		if (val) {
			editor.value.on('selectionUpdate', () => {
				let verbose = true

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

function newLine() {
	console.log('newLine')
	TiptapHelper.newLineOf(props.editor, getCurrentNode(), editor.value.state.selection.$anchor.pos)
}

function getCurrentNode() {
	let selection = editor.value.state.selection
	var nodePos: NodePos = editor.value.$pos(selection.$anchor.pos)

	console.log(nodePos)

	while (nodePos.depth > 1) {
		let parent = nodePos.parent

		if (!parent) {
			console.log(nodePos)
			throw new Error('parent is null')
		}

		nodePos = parent
	}

	return nodePos.node
}

function deleteNode() {
	editor.value.chain().focus().deleteSelectionNode().run()
}

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
	marginLeft.value = offsetLeft - 96

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
</script>

<template>
	<div v-if="visible" :style="`transform: translate(${marginLeft}px, ${scrollTop}px);`" class="w-22">
		<ButtonList>
			<Button tip="删除" @click="deleteNode">
				<IconDelete></IconDelete>
			</Button>

			<Button tip="增加一行" @click="newLine">
				<IconNewLine></IconNewLine>
			</Button>

			<MenuParagraph :editor="editor" v-if="shouldShowParagraphMenu()"></MenuParagraph>
		</ButtonList>
	</div>
</template>
