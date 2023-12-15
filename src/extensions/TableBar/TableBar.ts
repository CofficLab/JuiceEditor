import { VueNodeViewRenderer } from "@tiptap/vue-3";
import TableBarVue from "./TableBar.vue";
import Table from "@tiptap/extension-table";
import { mergeAttributes, Node } from "@tiptap/core";

const SmartTable = Node.create({
    addNodeView: () => VueNodeViewRenderer(TableBarVue),
});

export default SmartTable;
