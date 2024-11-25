import TaskList from "@tiptap/extension-task-list";
import UUIDHelper from '../helper/UUIDHelper';

const SmartTaskList = TaskList.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: '',
            },
            uuid: {
                default: UUIDHelper.generate("SmartTaskList"),
                parseHTML: (element) => {
                    return element.getAttribute('data-uuid')
                }
            }
        }
    },
});

export default SmartTaskList;
