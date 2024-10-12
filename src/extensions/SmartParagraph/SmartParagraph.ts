import Paragraph from "@tiptap/extension-paragraph";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartParagraph: {
            setParagraph: () => ReturnType
            setBackgroundCyan: () => ReturnType
            setBackgroundBlue: () => ReturnType
            setBackgroundYellow: () => ReturnType
            setBackgroundRed: () => ReturnType
            setBackgroundGreen: () => ReturnType
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
                default: "p-class"
            }
        }
    },

    // addNodeView: () => VueNodeViewRenderer(SmartParagraphVue),

    addCommands() {
        return {
            setParagraph: () => ({ commands }) => {
                return commands.setNode(this.name)
            },
            setBackgroundCyan: () => ({ commands }) => {
                return commands.updateAttributes(this.name, {
                    class: 'bg-gradient-to-r from-cyan-800/50 to-cyan-800/30'
                })
            },
            setBackgroundBlue: () => ({ commands }) => {
                return commands.updateAttributes(this.name, {
                    class: 'bg-gradient-to-r from-blue-800/50 to-blue-800/30'
                })
            },
            setBackgroundYellow: () => ({ commands }) => {
                return commands.updateAttributes(this.name, {
                    class: 'bg-gradient-to-r from-yellow-800/50 to-yellow-800/30'
                })
            },
            setBackgroundRed: () => ({ commands }) => {
                return commands.updateAttributes(this.name, {
                    class: 'bg-gradient-to-r from-red-800/50 to-red-800/30'
                })
            },
            setBackgroundGreen: () => ({ commands }) => {
                return commands.updateAttributes(this.name, {
                    class: 'bg-gradient-to-r from-green-800/50 to-green-800/30'
                })
            },

        };
    },
});

export default SmartParagraph;