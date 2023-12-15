import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartTableCellVue from "./SmartTableCell.vue";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";

const SmartTableCell = TableCell.extend({
    // addNodeView: () => VueNodeViewRenderer(SmartTableCellVue),
});

export default SmartTableCell;
