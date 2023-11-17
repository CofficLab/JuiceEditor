import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartLinVue from "./SmartLink.vue";
import Link from '@tiptap/extension-link'
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartLink: {
            toggleLink: () => ReturnType
        }
    }
}

const SmartLink = Link.extend({
    
})

// const SmartLink = Node.create({
//     name: "link",
//     group: "block",
//     content: "inline*",
//     isolating: false,
//     allowGapCursor: false,
//     parseHTML: () => [{ tag: "a" }],
//     renderHTML: ({node}) => ["a", node.attrs.text],
//     addAttributes() {
//         return {
//             href: {
//                 default: null,
//             },
//             text: {
//                 default: 'hello world',
//                 rendered: false,
//                 parseHTML: (element) => element.textContent
//             },
//         };
//     },
//     addCommands() {
//         return {
//             toggleLink:
//                 () =>
//                     ({ commands }) => {
//                         return commands.toggleNode(this.name, "paragraph");
//                     },
//         };
//     },
//     addNodeView: () => VueNodeViewRenderer(SmartLinVue),
// });

export default SmartLink;
