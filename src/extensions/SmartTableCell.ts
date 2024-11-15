import UUIDHelper from '../helper/UUIDHelper';
import { TableCellExtension } from "../model/TiptapGroup";

const SmartTableCell = TableCellExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            uuid: {
                default: UUIDHelper.generate(),
                parseHTML: (element) => {
                    return element.getAttribute('data-uuid') || UUIDHelper.generate()
                }
            }
        }
    },
});

export default SmartTableCell;
