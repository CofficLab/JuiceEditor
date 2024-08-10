import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartTaskListVue from "./SmartTaskList.vue";
import TaskList from "@tiptap/extension-task-list";

const SmartTaskList = TaskList.extend({
    addNodeView: () => VueNodeViewRenderer(SmartTaskListVue),
});

export default SmartTaskList;
