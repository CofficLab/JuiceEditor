import { TableExtension, TiptapExtension } from '../model/TiptapGroup'
import SmartImage from './SmartImage/SmartImage'
import { priorityOfSelection } from '../model/TiptapGroup'
import { Node as TiptapNode } from 'prosemirror-model'

export interface SmartSelectionStorage {
	leafSelectionType: string
	verbose: boolean
	title: string
	selectionTypes: string[]
	leafSelectionNode: TiptapNode | null
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		deleteSelectionNode: {
			deleteSelectionNode: () => ReturnType
			enableSmartSelectionVerbose: () => ReturnType
			disableSmartSelectionVerbose: () => ReturnType
			updateSelection: () => ReturnType
		}
	}
}

export default TiptapExtension.create<{}, SmartSelectionStorage>({
	name: 'selection',

	priority: priorityOfSelection,

	addStorage() {
		return {
			leafSelectionType: 'unknown',
			verbose: false,
			title: '🛟 SmartSelection',
			selectionTypes: [],
			leafSelectionNode: null
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
				const type = this.storage.leafSelectionType

				if (this.storage.verbose) {
					this.editor.commands.appendLog(this.storage.title, '🔄 deleteSelectionNode ' + type)
				}

				if (editor.isActive(TableExtension.name)) {
					return chain().focus().deleteTable().run()
				}

				if (type === SmartImage.name) {
					return chain().focus().deleteSelection().run()
				}

				return chain().focus().deleteNode(type).run()
			},

			updateSelection: () => ({ editor }) => {
				if (this.storage.verbose) {
					this.editor.commands.appendLog(this.storage.title, '🔄 updateSelection')
				}

				const { selection } = editor.state;
				const { $from, $to } = selection;
				var leafNode: TiptapNode | null = null;
				let types: string[] = [];

				editor.state.doc.nodesBetween($from.pos, $to.pos, (node) => {
					types.push(node.type.name);
					leafNode = node;
				});

				this.storage.selectionTypes = types;
				this.storage.leafSelectionType = this.storage.selectionTypes[this.storage.selectionTypes.length - 1]
				this.storage.leafSelectionNode = leafNode;

				return true
			}
		}
	},

	onSelectionUpdate() {
		if (this.storage.verbose) {
			this.editor.commands.appendLog(this.storage.title, '🔄 onSelectionUpdate')
		}

		this.editor.commands.updateSelection()

		if (this.storage.verbose) {
			this.editor.commands.appendLog(this.storage.title, '🔄 selectionTypes ' + this.storage.selectionTypes)
		}

		if (this.storage.verbose) {
			this.editor.commands.appendLog(this.storage.title, '🔄 leafSelectionType ' + this.storage.leafSelectionType)
		}
	},
})
