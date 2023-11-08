import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import Banner from "./SmartBanner.vue";
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    SmartBanner: {
      toggleBanner: () => ReturnType
    }
  }
}

export const SmartBanner = Node.create({
  name: "banner",
  group: "block",
  content: "inline*",
  isolating: false,
  allowGapCursor: false,
  parseHTML: () => [{ tag: "banner" }],
  renderHTML: () => ["banner", 0],
  addNodeView: () => VueNodeViewRenderer(Banner),
  addCommands() {
    return {
      toggleBanner:
        () =>
          ({ commands }) => {
            return commands.toggleNode(this.name, "paragraph");
          },
    };
  },
});
