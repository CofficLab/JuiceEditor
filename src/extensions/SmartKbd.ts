import { Mark, mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    SmartKbd: {
      toggleKbd: () => ReturnType
    }
  }
}

export default Mark.create({
  name: "kbd",

  inline: true,

  group: "inline",

  content: "text*",

  addOptions() {
    return {
      HTMLAttributes: {
        class: "kbd mx-1",
      },
    }
  },

  parseHTML: () => [{ tag: "kbd" }],

  renderHTML({ HTMLAttributes }) {
    return ['kbd', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      toggleKbd:
        () =>
          ({ commands }) => {
            return commands.toggleMark(this.name);
          },
    };
  },
});
