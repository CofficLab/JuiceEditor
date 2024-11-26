import { TaskItemExtension } from "../model/TiptapGroup";

const SmartTaskItem = TaskItemExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
        }
    },
});

export default SmartTaskItem;
