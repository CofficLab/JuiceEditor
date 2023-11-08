import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import TimeLine from "./TimeLine.vue";

export default Node.create({
  name: "timeLine",
  group: "block",
  atom: true,

  parseHTML() {
    return [
      {
        tag: "time-line",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["time-line", mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return VueNodeViewRenderer(TimeLine);
  },
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
      toggleTimeLine:
        () =>
        ({ editor, commands }) => {
          let html = editor.getHTML();
          if (html.includes("<time-line></time-line>")) {
            commands.setContent(html.replaceAll("<time-line></time-line>", ""), true);
            return;
          }

          return commands.insertContentAt(0, "<time-line></time-line>", {
            updateSelection: true,
            parseOptions: {
              preserveWhitespace: "full",
            },
          });
        },
    };
  },
});
