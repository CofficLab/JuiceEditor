<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Editor, NodePos } from '@tiptap/core'
import Button from '../ui/Button.vue'
import IconDelete from '../ui/icons/IconDelete.vue'
import TiptapHelper from '../helper/TiptapHelper'
import { HEADING, PARAGRAPH, TOC } from '../config/nodes'
import MenuParagraph from './MenuParagraph.vue'
import ButtonList from '../ui/ButtonList.vue'
import IconPlus from '../ui/icons/IconPlus.vue'
import IconRight from '../ui/icons/IconRight.vue'
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
			<Button tip="删除" @click="editor.commands.deleteSelectionNode()">
				<IconDelete size="md" color="primary"></IconDelete>
			</Button>

			<Button tip="增加一行" @click="editor.commands.addBlankLineAfterSelection()" v-if="shouldShowNewLineMenu()">
				<IconPlus size="md" color="primary"></IconPlus>
			</Button>

			<Button tip="往右移动" @click="editor.commands.setMargin('ml-6')">
				<IconRight size="md" color="primary"></IconRight>
			</Button>

			<MenuParagraph :editor="editor" v-if="shouldShowParagraphMenu()"></MenuParagraph>
		</ButtonList>
	</div>
</template>
