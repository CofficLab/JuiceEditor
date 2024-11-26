import { TableRowExtension } from "../model/TiptapGroup";

const SmartTableRow = TableRowExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
        }
    },
});

export default SmartTableRow;
