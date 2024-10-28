import { Node, VueNodeViewRenderer, mergeAttributes } from "@tiptap/vue-3";
import SmartTableVue from "./SmartTableHeader.vue";
import TableHeader from "@tiptap/extension-table-header";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartTable: {
            insertSmartTable: () => ReturnType
        }
    }
}

const SmartTableHeader = TableHeader.extend({
    // addNodeView() {
    //     return VueNodeViewRenderer(SmartTableVue);
    // }
})

export default SmartTableHeader;
