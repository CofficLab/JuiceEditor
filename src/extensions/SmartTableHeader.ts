import { TableHeaderExtension } from "../model/TiptapGroup";

const SmartTableHeader = TableHeaderExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
        }
    },
});

export default SmartTableHeader;
