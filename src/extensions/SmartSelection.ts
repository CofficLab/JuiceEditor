import { findParentNode } from '@tiptap/core'
import TiptapEditor from '../model/TiptapEditor'
import TiptapExtension from '../model/TiptapExtension'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import SmartImage from './SmartImage/SmartImage'
import Table from '@tiptap/extension-table'
import ListItem from '@tiptap/extension-list-item'
declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		setCurrentNodeSelection: {
			setCurrentNodeSelection: () => ReturnType
		}
		deleteSelectionNode: {
			deleteSelectionNode: () => ReturnType
		}
	}
}

export default TiptapExtension.create({
	name: 'selection',
	addProseMirrorPlugins() {
		const { editor } = this

		return [
			new Plugin({
				key: new PluginKey('selection'),
				props: {
					decorations(state) {
						if (state.selection.empty) {
							return null
						}

						if (editor.isFocused === true) {
							return null
						}

						return DecorationSet.create(state.doc, [
							Decoration.inline(state.selection.from, state.selection.to, {
								class: 'umo-text-selection',
							}),
						])
					},
				},
			}),
		]
	},
	addCommands() {
		return {
			setCurrentNodeSelection:
				() =>
					({ editor, chain }) => {
						let parentNode = findParentNode((node) =>
							[ListItem.name].includes(node.type.name),
						)(editor.state.selection)
						if (parentNode) {
							return chain().setNodeSelection(parentNode.pos).run()
						}
						// @ts-ignore
						const { $anchor, node } = editor.state.selection
						const pos = node?.attrs?.vnode
							? $anchor.pos
							: $anchor.pos - $anchor.parentOffset - 1
						return chain().setNodeSelection(pos).run()
					},
			deleteSelectionNode:
				() =>
					({ editor, chain }) => {
						const node = getSelectionNode(editor)
						if (!node) {
							console.warn("no selected node")
							return false
						}

						if (editor.isActive(Table.name)) {
							return chain().focus().deleteTable().run()
						}

						if (node.type.name === SmartImage.name) {
							return chain().focus().deleteSelection().run()
						}

						return chain().focus().deleteNode(node.type.name).run()
					},
		}
	},
})

export function getSelectionNode(editor: TiptapEditor) {
	// @ts-ignore
	const { node } = editor.state.selection
	if (node) {
		return node
	}
	let parentNode = findParentNode((node) => [ListItem.name].includes(node.type.name))(
		editor.state.selection,
	)
	const { $anchor } = editor.state.selection
	if (parentNode) {
		return $anchor.node(parentNode.depth)
	}
	editor.commands.selectParentNode()
	// @ts-ignore
	return editor.state.selection.node
}

export function getSelectionText(editor: TiptapEditor) {
	const { from, to, empty } = editor.state.selection
	if (empty) {
		return ''
	}
	return editor.state.doc.textBetween(from, to, '')
}

export function getSelectionTextLength(editor: TiptapEditor) {
	return getSelectionText(editor).length
}

export function isSelectionEmpty(editor: TiptapEditor) {
	return getSelectionTextLength(editor) == 0
}

export function hasSelection(editor: TiptapEditor) {
	return !isSelectionEmpty(editor)
}
