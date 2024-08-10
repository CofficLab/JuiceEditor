import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartHeadingVue from "./SmartHeading.vue";
import Heading from "@tiptap/extension-heading";
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartLink: {
            toggleLink: () => ReturnType
        }
    }
}

// 只有 Node 可以自定义 NodeView，Mark 不行
const SmartLink = Heading.extend({
    addNodeView: () => VueNodeViewRenderer(SmartHeadingVue),
});

export default SmartLink;
