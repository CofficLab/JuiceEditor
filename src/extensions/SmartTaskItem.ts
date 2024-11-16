import UUIDHelper from '../helper/UUIDHelper';
import { TaskItemExtension } from "../model/TiptapGroup";

const SmartTaskItem = TaskItemExtension.extend({
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

export default SmartTaskItem;
