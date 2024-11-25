import UUIDHelper from '../helper/UUIDHelper';
import { TaskItemExtension } from "../model/TiptapGroup";

const SmartTaskItem = TaskItemExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            uuid: {
                default: UUIDHelper.generate("SmartTaskItem"),
                parseHTML: (element) => {
                    return element.getAttribute('data-uuid')
                }
            }
        }
    },
});

export default SmartTaskItem;
