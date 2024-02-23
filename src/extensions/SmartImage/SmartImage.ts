import ImageTipTap from '@tiptap/extension-image'
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import SmartImageVue from './SmartImage.vue';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartImage: {
            insertImage: () => ReturnType,
        }
    }
}

const baseImage = 'data:image/png;base64,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'
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
    addCommands() {
        return {
            insertImage: () => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: {
                        src: baseImage,
                        alt: '',
                        title: ''
                    },
                })
            },
        }
    }
});

export default SmartImage;
