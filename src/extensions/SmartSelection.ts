import { findParentNode } from '@tiptap/core'
import { TiptapEditor, ListItemExtension, TableExtension, TiptapExtension } from '../model/TiptapGroup'
import SmartImage from './SmartImage/SmartImage'
import { priorityOfSelection } from '../model/TiptapGroup'

export interface SmartSelectionStorage {
	type: string
	verbose: boolean
	title: string
	selections: string[]
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		deleteSelectionNode: {
			deleteSelectionNode: () => ReturnType
			enableSmartSelectionVerbose: () => ReturnType
			disableSmartSelectionVerbose: () => ReturnType
		}
	}
}

export default TiptapExtension.create<{}, SmartSelectionStorage>({
	name: 'selection',

	priority: priorityOfSelection,

	addStorage() {
		return {
			type: 'unknown',
			verbose: false,
			title: '🛟 SmartSelection',
			selections: []
		}
	},

	addCommands() {
		return {
			enableSmartSelectionVerbose: () => () => {
				this.storage.verbose = true
				return true
			},

			disableSmartSelectionVerbose: () => () => {
				this.storage.verbose = false
				return true
			},

			deleteSelectionNode: () => ({ editor, chain }) => {
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

	onSelectionUpdate() {
		const { selection } = this.editor.state;
		const { $from } = selection;

		// // 构建从根节点到当前节点的路径
		// let node = $from.node();
		// let path = [];

		// // 从当前节点向上遍历到文档根节点
		// for (let depth = $from.depth; depth >= 0; depth--) {
		// 	path.unshift(node.type.name);
		// 	node = $from.node(depth);
		// }

		// this.storage.selections = path

		// const selectedNode = getSelectionNode(this.editor)

		// if (selectedNode?.type.name === this.storage.type) {
		// 	return
		// }

		// if (this.storage.verbose) {
		// 	console.log(this.storage.title, "onSelectionUpdate, type changed", node?.type.name)
		// }

		// this.storage.type = node?.type.name ?? 'unknown'
	},
})

export function getSelectionNode(editor: TiptapEditor) {
	console.log("get selection node")
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

	// @ts-ignore
	return editor.state.selection.node
}
