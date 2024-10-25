import { VueNodeViewRenderer } from "@tiptap/vue-3";
import Heading from "@tiptap/extension-heading";

const SmartHeading = Heading.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: "heading-class",
            },
        }
    },
})

export default SmartHeading
