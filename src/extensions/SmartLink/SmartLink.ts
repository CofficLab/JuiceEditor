import { Link } from "@tiptap/extension-link";

const SmartLink = Link.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            text: {
                default: ' ',
                rendered: false,
                parseHTML: (element) => element.textContent
            },
        };
    },
});

export default SmartLink;
