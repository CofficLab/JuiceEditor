import { TableCellExtension } from "../model/TiptapGroup";

const SmartTableCell = TableCellExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
        }
    },
});

export default SmartTableCell;
