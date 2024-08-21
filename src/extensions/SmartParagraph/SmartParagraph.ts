import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartParagraphVue from "./SmartParagraph.vue";
import Paragraph from "@tiptap/extension-paragraph";

const SmartParagraph = Paragraph.extend({
    parseHTML: () => [
        { tag: "banner" },
        { tag: "p" },
    ],

    addAttributes() {
        return {
            class: {
                default: "my-class"
            },
            type: {
                default: "paragraph"
            }
        }
    },

    addNodeView: () => VueNodeViewRenderer(SmartParagraphVue),
});

export default SmartParagraph;
