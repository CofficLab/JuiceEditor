import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartLinkVue from "./SmartLink.vue";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartLink: {
            toggleLink: () => ReturnType
        }
    }
}

const SmartLink = Node.create({
    name: "a",
    inline: true,
    group: "inline",
    content: "text*",
    parseHTML: () => [{ tag: "a" }],
    // renderHTML: ({ node }) => [
    //     "a",
    //     mergeAttributes(this.options.HTMLAttributes, node.attrs),
    //     node.attrs.text
    // ],
    renderHTML({ HTMLAttributes }) {
        return ['kbd', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    },
    addAttributes() {
        return {
            href: {
                default: null,
            },
            text: {
                default: ' ',
                rendered: false,
                parseHTML: (element) => element.textContent
            },
        };
    },
    addCommands() {
        return {
            toggleLink:
                () =>
                    ({ editor, commands }) => {
                        return editor.chain().deleteSelection().run()
                    },
        };
    },
    addNodeView: () => VueNodeViewRenderer(SmartLinkVue),
});

export default SmartLink;
