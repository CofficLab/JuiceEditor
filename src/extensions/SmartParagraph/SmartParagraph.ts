import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartParagraphVue from "./SmartParagraph.vue";
import Paragraph from "@tiptap/extension-paragraph";
import { v4 as uuidv4 } from 'uuid';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartParagraph: {
            setParagraph: () => ReturnType
            setParagraphCyan: (type: string) => ReturnType
            setParagraphBlue: (type: string) => ReturnType
            setParagraphYellow: (type: string) => ReturnType
            setParagraphRed: (type: string) => ReturnType
            setParagraphGreen: (type: string) => ReturnType
        }
    }
}

const SmartParagraph = Paragraph.extend({
    parseHTML: () => [
        { tag: "banner" },
        { tag: "p" },
    ],

    addAttributes() {
        return {
            class: {
                default: "my-class"
            },
            type: {
                default: "paragraph"
            }
        }
    },

    // addNodeView: () => VueNodeViewRenderer(SmartParagraphVue),

    addCommands() {
        return {
            setParagraph: () => ({ commands }) => {
                return commands.setNode(this.name)
            },
            setParagraphCyan: (type: string) => ({ commands }) => {
                return commands.updateAttributes(this.name, {
                    class: 'bg-gradient-to-r from-cyan-800/50 to-cyan-800/30',
                    type: type
                })
            },
            setParagraphBlue: (type: string) => ({ commands }) => {
                return commands.updateAttributes(this.name, {
                    class: 'bg-gradient-to-r from-blue-800/50 to-blue-800/30',
                    type: type
                })
            },
            setParagraphYellow: (type: string) => ({ commands }) => {
                return commands.updateAttributes(this.name, {
                    class: 'bg-gradient-to-r from-yellow-800/50 to-yellow-800/30',
                    type: type
                })
            },
            setParagraphRed: (type: string) => ({ commands }) => {
                return commands.updateAttributes(this.name, {
                    class: 'bg-gradient-to-r from-red-800/50 to-red-800/30',
                    type: type
                })
            },
            setParagraphGreen: (type: string) => ({ commands }) => {
                return commands.updateAttributes(this.name, {
                    class: 'bg-gradient-to-r from-green-800/50 to-green-800/30',
                    type: type
                })
            },

        };
    },
});

export default SmartParagraph;