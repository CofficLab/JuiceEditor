import UUIDHelper from '../helper/UUIDHelper';
import { TableHeaderExtension } from "../model/TiptapGroup";

const SmartTableHeader = TableHeaderExtension.extend({
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

export default SmartTableHeader;
