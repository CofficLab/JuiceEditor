import Highlight from "@tiptap/extension-highlight";
import { mergeAttributes } from "@tiptap/core";

const Brick = Highlight.extend({
  name: "brick",

  parseHTML() {
    return [
      {
        tag: "brick",
      },
    ];
  },

  addAttributes() {
    return {
      color: {
        default: null,
        // Customize the HTML parsing (for example, to load the initial content)
        parseHTML: (element) => element.getAttribute("class"),
        // … and customize the HTML rendering.
        renderHTML: (attributes) => {
          return {
            class: "brick",
          };
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["brick", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setBrick:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      unsetBrick:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
      toggleBrick:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, { class: "brick" });
        },
    };
  },
});

export default Brick;
