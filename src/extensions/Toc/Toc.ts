import { mergeAttributes, Node, Editor } from "@tiptap/core";
import Heading from "./Heading";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableOfContents: {
      makeTree: () => (options: { editor: Editor }) => Heading
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
  // addNodeView() {
  //   return VueNodeViewRenderer(TocView);
  // },
  addGlobalAttributes() {
    return [
      {
        types: ["heading"],
        attributes: {
          id: {
            default: null,
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      makeTree: () => ({ editor }): Heading => {
        return Heading.makeTree(editor)
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
        return commands.insertContentAt(editor.state.doc.content.size, "<toc></toc>", {
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
        console.log("toggleToc")
        if (commands.hasToc()) {
          return commands.removeToc()
        }

        return commands.addToc()
      },
    };
  },
});
