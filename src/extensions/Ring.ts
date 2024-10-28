import TiptapExtension from '../model/TiptapExtension';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const noRingTypes: string[] = []

export const Ring = TiptapExtension.create({
    name: 'ring',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('ring'),
                props: {
                    decorations: ({ doc, selection }) => {
                        const decorations: Decoration[] = []

                        doc.descendants((node, pos) => {
                            if (doc.resolve(pos).depth > 1 || noRingTypes.includes(node.type.name)) {
                                return false
                            }

                            decorations.push(
                                Decoration.node(pos, pos + node.nodeSize, {
                                    class: 'ring ring-1 ring-red-500/30',
                                }),
                            )
                        })

                        return DecorationSet.create(doc, decorations)
                    },
                },
            }),
        ];
    },
});