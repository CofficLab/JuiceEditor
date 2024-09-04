import { Node, VueNodeViewRenderer, mergeAttributes } from "@tiptap/vue-3";
import SmartTableVue from "./SmartTable.vue";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartTable: {
            insertSmartTable: () => ReturnType
        }
    }
}

const SmartTable = Node.create({
    name: "smart-table",
    group: "block",
    content: "block*",
    parseHTML: () => [
        { tag: "table" },
    ],
    renderHTML: ({ HTMLAttributes }) => [
        "div", mergeAttributes(HTMLAttributes), 0
    ],
    addAttributes() {
        return {
            class: {
                default: 'smart-table',
            }
        };
    },
    addNodeView: () => VueNodeViewRenderer(SmartTableVue),
    addCommands() {
        return {
            insertSmartTable:
                () =>
                    ({ commands }) => {
                        return commands.insertContent("<table><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></table>");
                    },
        }
    }
});

export default SmartTable;
