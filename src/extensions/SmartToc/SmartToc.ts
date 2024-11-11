import { mergeAttributes, Node, Editor } from "@tiptap/core";
import SmartHeading from "./SmartHeading";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import TocView from "./TocView.vue";
import { TiptapEditor } from "../../model/TiptapGroup";

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		tableOfContents: {
			makeTree: () => (options: { editor: Editor }) => SmartHeading
			makeLink: () => ReturnType
			addToc: () => ReturnType
			removeToc: () => ReturnType
			toggleToc: () => ReturnType
		}
	}
}

export const SmartToc = Node.create({
	name: "toc",

	group: "block",

	atom: true,

	parseHTML() {
		return [
			{
				tag: "toc",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ["toc", mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return VueNodeViewRenderer(TocView as any)
	},

	addStorage() {
		return {
			debug: false,
			verbose: true,
			title: "🐒 TOC",
		}
	},

	addGlobalAttributes() {
		return [
			{
				types: ["heading"],
				attributes: {
					id: {
						default: "0",
					},
				},
			},
		];
	},

	addCommands() {
		return {
			makeTree: () => ({ editor }): SmartHeading => {
				return SmartHeading.makeTree(editor)
			},

			addToc: () => ({ editor, commands }) => {
				if (this.storage.verbose) {
					console.log(this.storage.title, "addToc, content size is", editor.state.doc.content.size)
				}

				let size = editor.state.doc.content.size

				if (size < 1) {
					return false
				}

				return commands.insertContentAt(editor.state.doc.content.size - 1, "<toc></toc>", {
					updateSelection: false,
					parseOptions: {
						preserveWhitespace: "full",
					},
				});
			},

			removeToc: () => ({ editor, commands }) => {
				if (this.storage.verbose) {
					console.log(this.storage.title, "removeToc")
				}

				let nodesDeleting: { pos: number; size: number; }[] = []
				editor.state.doc.descendants((node, pos) => {
					if (node.type.name == this.name) {
						nodesDeleting.push({
							pos: pos,
							size: node.nodeSize
						})
					}
				})

				nodesDeleting.reverse().forEach(item => {
					commands.deleteRange({
						from: item.pos,
						to: item.pos + item.size,
					})
				})

				return true;
			},

			toggleToc: () => ({ commands }) => {
				if (this.storage.verbose) {
					console.log(this.storage.title, "toggleToc")
				}

				let hasToc = false

				this.editor.state.doc.descendants((node) => {
					if (node.type.name == this.name) {
						hasToc = true

						return false
					}
				});

				return hasToc ? commands.removeToc() : commands.addToc()
			},
		};
	},
});
