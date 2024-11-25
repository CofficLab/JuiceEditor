import UUIDHelper from '../helper/UUIDHelper';
import { TableHeaderExtension } from "../model/TiptapGroup";

const SmartTableHeader = TableHeaderExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            uuid: {
                default: UUIDHelper.generate("SmartTableHeader"),
                parseHTML: (element) => {
                    return element.getAttribute('data-uuid')
                }
            }
        }
    },
});

export default SmartTableHeader;
