<script lang="ts" setup>
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { Editor, BubbleMenu } from '@tiptap/vue-3'
import { Editor as TiptapEditor } from '@tiptap/core'
import ButtonBar from '../ui/ButtonBar.vue'
import { A, DRAW, HEADING, IMAGE, PARAGRAPH, TABLE, TABLE_CELL, TABLE_HEADER, TABLE_ROW, TEXT, TOC, BRANCH, BRANCH_CONTENT, LINK } from '../config/nodes'
import MenuImage from './MenuImage.vue'
import MenuTable from './MenuTable.vue'
import MenuHeading from './MenuHeading.vue'
import MenuFormat from './MenuFormat.vue'
import MenuDraw from './MenuDraw.vue'
import MenuLink from './MenuLink.vue'
import { computed } from 'vue'

let emoji = "🫧 BubbleMenus"

const props = defineProps({
	editor: {
		type: Editor,
		required: true
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
	let verbose = false
	const { selection } = props.state
	const { empty } = selection
	const shouldShowNodes = [IMAGE, TABLE, LINK]
	const excludes = [TOC, DRAW, TABLE_CELL, TABLE_ROW, TABLE_HEADER, BRANCH, BRANCH_CONTENT]

	// 如果是只读模式，不显示
	if (props.editor.isEditable == false) {
		return false
	}

	// 如果当前是Heading，且Level=1，不显示
	if (props.editor.isActive(HEADING) && props.editor.getAttributes(HEADING).level === 1) {
		return false
	}

	// 如果当前是应该显示的节点，显示
	if (shouldShowNodes.some(node => props.editor.isActive(node))) {
		return true;
	}

	if (excludes.some(node => props.editor.isActive(node))) {
		if (verbose) {
			console.log(emoji, 'hide bubble menu, node is excluded')
		}
		return false;
	}

	if (props.editor.isActive(HEADING, { level: 1 })) {
		if (verbose) {
			console.log(emoji, 'hide bubble menu, current is h1')
		}
		return false
	}

	if (!selection.visible) {
		if (verbose) {
			console.log(emoji, 'invisible selection, hide bubble menu')
		}
		return false
	}

	if (empty) {
		if (verbose) {
			console.log(emoji, 'empty selection, hide bubble menu')
		}
	}

	return !empty
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

const shouldShowTableMenu = computed(() => {
	return props.editor.isActive(TABLE)
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
			appendTo: 'parent'
		}" :editor="editor">
			<ButtonBar v-if="shouldShowHeadingMenu || shouldShowFormatMenu">
				<MenuHeading :editor="editor" v-if="shouldShowHeadingMenu"></MenuHeading>
				<MenuFormat :editor="editor" v-if="shouldShowFormatMenu"></MenuFormat>
			</ButtonBar>

			<ButtonBar v-if="shouldShowDrawMenu">
				<MenuDraw :editor="editor"></MenuDraw>
			</ButtonBar>

			<ButtonBar v-if="shouldShowImageMenu">
				<MenuImage :editor="editor"></MenuImage>
			</ButtonBar>

			<ButtonBar v-if="shouldShowTableMenu">
				<MenuTable :editor="editor"></MenuTable>
			</ButtonBar>

			<ButtonBar v-if="shouldShowLinkMenu">
				<MenuLink :editor="editor"></MenuLink>
			</ButtonBar>
		</bubble-menu>
	</div>
</template>