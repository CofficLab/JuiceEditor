import { mergeAttributes, Node, Editor } from "@tiptap/core";
import SmartHeading from "./SmartHeading";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import TocView from "./TocView.vue";

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		tableOfContents: {
			makeTree: () => (options: { editor: Editor }) => SmartHeading
			makeLink: () => ReturnType
			hasToc: () => ReturnType
			addToc: () => ReturnType
			removeToc: () => ReturnType
			toggleToc: () => ReturnType
		}
	}
}

export const Toc = Node.create({
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
			hasToc: () => ({ editor }) => {
				let result = false
				editor.state.doc.descendants((node) => {
					if (node.type.name == this.name) {
						result = true
						return
					}
				});

				return result
			},
			addToc: () => ({ editor, commands }) => {
				let verbose = true
				if (verbose) {
					console.log("addToc, content size is", editor.state.doc.content.size)
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
				let verbose = false
				if (verbose) {
					console.log("toggleToc")
				}

				if (commands.hasToc()) {
					return commands.removeToc()
				}

				return commands.addToc()
			},
		};
	},
});
