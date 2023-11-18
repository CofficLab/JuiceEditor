import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartLinVue from "./SmartLink.vue";
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartLink: {
            toggleLink: () => ReturnType
        }
    }
}

// 只有 Node 可以自定义 NodeView，Mark 不行
const SmartLink = Node.create({
    name: "link",
    inline: true,
    group: "inline",
    content: "text*",
    parseHTML: () => [{ tag: "a" }],
    renderHTML: ({ node }) => ["a", node.attrs.text],
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
    addNodeView: () => VueNodeViewRenderer(SmartLinVue),
});

export default SmartLink;
