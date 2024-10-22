import Blockquote from "@tiptap/extension-blockquote"
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartQuoteVue from "./SmartQuote.vue";

const SmartQuote = Blockquote.extend({
    addNodeView() {
        return VueNodeViewRenderer(SmartQuoteVue as any)
    },
});

export default SmartQuote;
