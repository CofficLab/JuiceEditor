import TaskList from "@tiptap/extension-task-list";

const SmartTaskList = TaskList.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: '',
            },
        }
    },
});

export default SmartTaskList;
