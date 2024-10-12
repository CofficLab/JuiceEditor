import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartBulletListVue from "./SmartBulletList.vue";
import BulletList from "@tiptap/extension-bullet-list";

const SmartBulletList = BulletList.extend({
    // addNodeView: () => VueNodeViewRenderer(SmartBulletListVue),
});

export default SmartBulletList;
