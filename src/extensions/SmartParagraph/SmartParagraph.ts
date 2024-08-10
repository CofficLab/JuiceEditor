import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartParagraphVue from "./SmartParagraph.vue";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";

const SmartParagraph = Paragraph.extend({
    addNodeView: () => VueNodeViewRenderer(SmartParagraphVue),
});

export default SmartParagraph;
