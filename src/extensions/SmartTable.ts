import UUIDHelper from '../helper/UUIDHelper';
import { TableExtension, TaskItemExtension } from "../model/TiptapGroup";

const SmartTable = TableExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            uuid: {
                default: UUIDHelper.generate("SmartTable"),
                parseHTML: (element) => {
                    return element.getAttribute('data-uuid')
                }
            }
        }
    },
});

export default SmartTable;
