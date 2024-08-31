<script lang="ts" setup>
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { Editor, BubbleMenu } from '@tiptap/vue-3'
import { Editor as TiptapEditor } from '@tiptap/core'
import ButtonBar from '../ui/ButtonBar.vue'
import { HEADING, IMAGE, PARAGRAPH, TABLE } from '../config/node-names'
import MenuImage from './MenuImage.vue'
import MenuTable from './MenuTable.vue'
import MenuHeading from './MenuHeading.vue'
import MenuFormat from './MenuFormat.vue'
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
	const { selection } = props.state
	const { empty } = selection
	const shuoldShowNodes = [IMAGE, TABLE]
	const excludes = ['toc', 'draw', 'link', 'tableCell', 'tableRow', 'tableHeader']

	if (shuoldShowNodes.some(node => props.editor.isActive(node))) {
		return true;
	}

	if (excludes.some(node => props.editor.isActive(node))) {
		return false;
	}

	if (props.editor.isActive('heading', { level: 1 })) {
		return false
	}

	if (!selection.visible) {
		return false
	}

	if (empty) {
		console.log('empty selection, hide bubble menu')
	}

	return !empty
}

const shouldShowHeadingMenu = computed(() => {
	const nodesShow = [HEADING, PARAGRAPH]

	return nodesShow.some(node => {
		props.editor.isActive(node)
	})
})

const shouldShowFormatMenu = computed(() => {
	const nodesShow = [HEADING, PARAGRAPH]

	return nodesShow.some(node => {
		props.editor.isActive(node)
	})
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
			<ButtonBar>
				<MenuHeading :editor="editor" v-if="shouldShowHeadingMenu">
				</MenuHeading>
				<MenuFormat :editor="editor" v-if="shouldShowFormatMenu"></MenuFormat>
				<MenuImage :editor="editor" v-if="editor.isActive(IMAGE)"></MenuImage>
				<MenuTable :editor="editor" v-if="editor.isActive(TABLE)"></MenuTable>
			</ButtonBar>
		</bubble-menu>
	</div>
</template>