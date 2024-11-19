import { findParentNode } from '@tiptap/core'
import { TiptapEditor, ListItemExtension, TableExtension, TiptapExtension } from '../model/TiptapGroup'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import SmartImage from './SmartImage/SmartImage'

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
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
			deleteSelectionNode:
				() =>
					({ editor, chain }) => {
						const node = getSelectionNode(editor)
						if (!node) {
							console.warn("no selected node")
							return false
						}

						if (editor.isActive(TableExtension.name)) {
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
	let parentNode = findParentNode((node) => [ListItemExtension.name].includes(node.type.name))(
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
