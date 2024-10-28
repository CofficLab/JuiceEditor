import { Node, VueNodeViewRenderer, mergeAttributes } from "@tiptap/vue-3";
import SmartTableRowVue from "./SmartTableRow.vue";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartTable: {
            insertSmartTable: () => ReturnType
        }
    }
}

const SmartTableRow = TableRow.extend({
    // addNodeView() {
    //     return VueNodeViewRenderer(SmartTableRowVue);
    // }
})

export default SmartTableRow;
