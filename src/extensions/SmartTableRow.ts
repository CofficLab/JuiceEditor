import UUIDHelper from '../helper/UUIDHelper';
import { TableRowExtension } from "../model/TiptapGroup";

const SmartTableRow = TableRowExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            uuid: {
                default: UUIDHelper.generate("SmartTableRow"),
                parseHTML: (element) => {
                    return element.getAttribute('data-uuid')
                }
            }
        }
    },
});

export default SmartTableRow;
