import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartParagraphVue from "./SmartParagraph.vue";
import Paragraph from "@tiptap/extension-paragraph";
import { v4 as uuidv4 } from 'uuid';

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
            },
            uuid: {
                default: null,
                parseHTML: element => element.getAttribute('data-uuid'),
                renderHTML: attributes => {
                    if (!attributes.uuid) {
                        attributes.uuid = uuidv4();
                    }
                    return { 'data-uuid': attributes.uuid }
                }
            }
        }
    },

    addNodeView: () => VueNodeViewRenderer(SmartParagraphVue),
});

export default SmartParagraph;