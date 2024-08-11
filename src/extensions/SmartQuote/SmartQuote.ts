import Blockquote from "@tiptap/extension-blockquote"
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartQuoteVue from "./SmartQuote.vue";

const SmartLink = Blockquote.extend({
    addNodeView: () => VueNodeViewRenderer(SmartQuoteVue),
});

export default SmartLink;
