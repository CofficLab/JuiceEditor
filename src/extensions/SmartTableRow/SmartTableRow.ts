import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartTableCellVue from "./SmartTableRow.vue";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableRow from "@tiptap/extension-table-row";

const SmartTableRow = TableRow.extend({
    addNodeView: () => VueNodeViewRenderer(SmartTableCellVue),
});

export default SmartTableRow;
