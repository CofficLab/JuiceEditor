import { TableExtension } from "../model/TiptapGroup";

const SmartTable = TableExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
        }
    },
});

export default SmartTable;
