import UUIDHelper from '../helper/UUIDHelper';
import { TableExtension, TaskItemExtension } from "../model/TiptapGroup";

const SmartTable = TableExtension.extend({
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

export default SmartTable;
