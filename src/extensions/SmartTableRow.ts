import UUIDHelper from '../helper/UUIDHelper';
import { TableRowExtension } from "../model/TiptapGroup";

const SmartTableRow = TableRowExtension.extend({
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

export default SmartTableRow;
