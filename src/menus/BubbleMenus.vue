<script lang="ts" setup>
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { Editor, BubbleMenu } from '@tiptap/vue-3'
import { Editor as TiptapEditor } from '@tiptap/core'
import Bold from '../operators/Bold.vue'
import Heading from '../operators/Heading.vue'
import Italic from '../operators/Italic.vue'
import Paragraph from '../operators/Paragraph.vue'
import StrikeVue from '../operators/Strike.vue'
import BulletList from '../operators/BulletList.vue'
import Code from '../operators/Code.vue'
import Link from '../operators/Link.vue'
import ButtonBar from '../ui/ButtonBar.vue'
import Kbd from '../operators/Kbd.vue'
import { HEADING, IMAGE } from '../config/node-names'
import MenuImage from './MenuImage.vue'

let emoji = "🫧 BubbleMenus"

defineProps({
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
	const shuoldShowNodes = [IMAGE]
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
				<Heading :editor="editor" :level="2" v-if="editor.isActive(HEADING)" />
				<Heading :editor="editor" :level="3" v-if="editor.isActive(HEADING)" />
				<Heading :editor="editor" :level="4" v-if="editor.isActive(HEADING)" />
				<Heading :editor="editor" :level="5" v-if="editor.isActive(HEADING)" />
				<Heading :editor="editor" :level="6" v-if="editor.isActive(HEADING)" />
				<Paragraph :editor="editor" v-if="editor.isActive(HEADING)"></Paragraph>
				<Bold :editor="editor" v-if="!editor.isActive(IMAGE)"></Bold>
				<Italic :editor="editor" v-if="!editor.isActive(IMAGE)"></Italic>
				<StrikeVue :editor="editor" v-if="!editor.isActive(IMAGE)"></StrikeVue>
				<BulletList :editor="editor" v-if="!editor.isActive(IMAGE)"></BulletList>
				<Code :editor="editor" v-if="!editor.isActive(IMAGE)"></Code>
				<Link :editor="editor" v-if="!editor.isActive(IMAGE)" />
				<Kbd :editor="editor" v-if="!editor.isActive(IMAGE)"></Kbd>

				<MenuImage :editor="editor" v-if="editor.isActive(IMAGE)"></MenuImage>
			</ButtonBar>
		</bubble-menu>
	</div>
</template>