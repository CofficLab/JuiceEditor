import ImageTipTap from '@tiptap/extension-image'
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import SmartImageVue from './SmartImage.vue';

const SmartImage = ImageTipTap.extend({
    addNodeView() {
        return VueNodeViewRenderer(SmartImageVue)
    },
    addAttributes() {
        return {
            class: "",
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
        }
    },
});

export default SmartImage;
