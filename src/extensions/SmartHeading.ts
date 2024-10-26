import Heading from "@tiptap/extension-heading";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartHeading: {
            setHeading1: () => ReturnType,
            setHeading2: () => ReturnType,
            setHeading3: () => ReturnType,
            setHeading4: () => ReturnType,
            setHeading5: () => ReturnType,
            setHeading6: () => ReturnType,
        }
    }
}

const SmartHeading = Heading.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: "heading-class",
            },
        }
    },

    addCommands() {
        return {
            ...this.parent?.(),
            setHeading1: () => ({ chain }) => chain().setHeading({ level: 1 }).run(),
            setHeading2: () => ({ chain }) => chain().setHeading({ level: 2 }).run(),
            setHeading3: () => ({ chain }) => chain().setHeading({ level: 3 }).run(),
            setHeading4: () => ({ chain }) => chain().setHeading({ level: 4 }).run(),
            setHeading5: () => ({ chain }) => chain().setHeading({ level: 5 }).run(),
            setHeading6: () => ({ chain }) => chain().setHeading({ level: 6 }).run(),
        }
    },
})

export default SmartHeading
