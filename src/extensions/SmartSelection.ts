import { Editor, Extension, findParentNode } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { LIST_TYPE } from '../config/nodes'
import SmartImage from './SmartImage/SmartImage'
import Table from '@tiptap/extension-table'
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

export default Extension.create({
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
							LIST_TYPE.includes(node.type.name),
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

export function getSelectionNode(editor: Editor) {
	// @ts-ignore
	const { node } = editor.state.selection
	if (node) {
		return node
	}
	let parentNode = findParentNode((node) => LIST_TYPE.includes(node.type.name))(
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

export function getSelectionText(editor: Editor) {
	const { from, to, empty } = editor.state.selection
	if (empty) {
		return ''
	}
	return editor.state.doc.textBetween(from, to, '')
}
