import { TiptapExtension } from '../model/TiptapGroup'
import { TextSelection } from '@tiptap/pm/state'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        addBlankLineAfterSelection: {
            addBlankLineAfterSelection: () => ReturnType
        }
    }
}

export const NewLine = TiptapExtension.create({
    name: 'newLine',

    addCommands() {
        return {
            addBlankLineAfterSelection: () => ({ tr, dispatch }) => {
                const { selection } = tr
                if (!selection || !(selection instanceof TextSelection)) {
                    return false
                }

                const pos = selection.$to.end()
                if (dispatch) {
                    const newParagraph = this.editor.schema.nodes.paragraph.create(
                        null,
                        this.editor.schema.text('Type here...')
                    )
                    tr.insert(pos, newParagraph)

                    // 更新光标位置
                    const newPos = pos + newParagraph.nodeSize - 1
                    tr.setSelection(TextSelection.create(tr.doc, newPos))
                }

                return true
            },
        }
    },

    addKeyboardShortcuts() {
        return {
            'Mod-Enter': () => this.editor.commands.addBlankLineAfterSelection(),
        }
    },
})
