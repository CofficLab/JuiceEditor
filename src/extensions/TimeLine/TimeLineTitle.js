import Highlight from "@tiptap/extension-highlight";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import TimeLineTitle from "./TimeLineTitle.vue";
import Banner from "./Banner";

export default Banner.extend({
  name: "timeLineTitle",

  parseHTML() {
    return [
      {
        tag: "time-line-title",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["time-line-title", HTMLAttributes, 0];
  },

  addNodeView() {
    return VueNodeViewRenderer(TimeLineTitle);
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
            class: "time-line-title",
          };
        },
      },
    };
  },
  addCommands() {
    return {
      setTimeLineTitle:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      unsetTimeLineTitle:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
      toggleTimeLineTitle:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleNode(this.name, "paragraph");
          return commands.toggleMark(this.name, attributes);
        },
    };
  },
});
