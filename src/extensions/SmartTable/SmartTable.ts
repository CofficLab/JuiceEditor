import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartTableVue from "./SmartTable.vue";
import Table from "@tiptap/extension-table";

const SmartTable = Table.extend({
    // addNodeView: () => VueNodeViewRenderer(SmartTableVue),
});

export default SmartTable;
