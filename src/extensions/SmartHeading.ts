import Heading from "@tiptap/extension-heading";
import TocHeading from "./SmartToc/TocHeading";
export interface SmartHeadingStorage {
    title: string
    headings: TocHeading[]
    verbose: boolean
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartHeading: {
            setHeading1: () => ReturnType,
            setHeading2: () => ReturnType,
            setHeading3: () => ReturnType,
            setHeading4: () => ReturnType,
            setHeading5: () => ReturnType,
            setHeading6: () => ReturnType,
            updateHeadings: () => ReturnType,
        }
    }
}

const SmartHeading = Heading.extend<{}, SmartHeadingStorage>({
    addStorage() {
        return {
            title: "🦊 SmartHeading",
            headings: [],
            verbose: false,
        }
    },

    onUpdate() {
        this.editor.commands.updateHeadings()
    },

    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: "heading-class",
            }
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
            updateHeadings: () => ({ tr, state, dispatch }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.title, '查找 Headings')
                }
                var headings: TocHeading[] = []

                state.doc.descendants((node: any, pos: any) => {
                    if (['heading'].includes(node.type.name)) {
                        const id = `heading-${headings.length + 1}`

                        if (node.attrs.id !== id) {
                            tr.setNodeMarkup(pos, undefined, { ...node.attrs, id })
                        }

                        headings.push(new TocHeading()
                            .setId(id)
                            .setText(node.textContent)
                            .setLevel(node.attrs.level)
                        )
                    }
                })

                tr.setMeta('addToHistory', false)
                tr.setMeta('preventUpdate', true)

                if (dispatch) {
                    dispatch(tr)
                }

                this.storage.headings = headings

                return true
            }

        }
    },
})

export default SmartHeading
