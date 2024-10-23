import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { Root } from './Root/Root';

export const SmartActive = Extension.create<{
    className: string
}>({
    name: 'active',

    addOptions() {
        return {
            className: 'has-active',
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('active'),
                props: {
                    decorations: ({ doc, selection }) => {
                        var found = false;
                        const decorations: Decoration[] = []
                        const { from, to } = selection

                        doc.nodesBetween(from, to, (node, pos) => {
                            if (found) {
                                return false;
                            }

                            if (this.editor.isActive(node.type.name) && node.type.name != Root.name) {
                                decorations.push(
                                    Decoration.node(pos, pos + node.nodeSize, {
                                        class: this.options.className,
                                    })
                                )

                                found = true;
                            }
                        })

                        return DecorationSet.create(doc, decorations)
                    },
                },
            }),
        ]
    },
});
