import UUIDHelper from '../helper/UUIDHelper';
import { TableCellExtension } from "../model/TiptapGroup";

const SmartTableCell = TableCellExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            uuid: {
                default: UUIDHelper.generate("SmartTableCell"),
                parseHTML: (element) => {
                    return element.getAttribute('data-uuid')
                }
            }
        }
    },
});

export default SmartTableCell;
