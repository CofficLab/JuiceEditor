import UUIDHelper from '../helper/UUIDHelper';
import { TableExtension, TaskItemExtension } from "../model/TiptapGroup";

const SmartTable = TableExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
        }
    },
});

export default SmartTable;
