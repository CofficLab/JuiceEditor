import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { PRE, TASK_ITEM } from '../config/node-names';

const noPaddingTypes = [PRE];

export const Padding = Extension.create({
    name: 'padding',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('padding'),
                props: {
                    decorations: ({ doc, selection }) => {
                        const decorations: Decoration[] = []

                        doc.descendants((node, pos) => {
                            if (node.isInline || noPaddingTypes.includes(node.type.name) || doc.resolve(pos).depth > 1) {
                                return false
                            }

                            decorations.push(
                                Decoration.node(pos, pos + node.nodeSize, {
                                    class: 'px-8',
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