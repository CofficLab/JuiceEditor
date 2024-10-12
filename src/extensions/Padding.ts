import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { IMAGE, PRE, ROOT, PARAGRAPH } from '../config/nodes';

const noPaddingTypes = [PRE, IMAGE, ROOT];
const title = '👔 Padding'

export const Padding = Extension.create({
    name: 'padding',

    addOptions() {
        return {
            noPaddingTypes: noPaddingTypes,
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('padding'),
                props: {
                    decorations: ({ doc, selection }) => {
                        const decorations: Decoration[] = []

                        doc.descendants((node, pos) => {
                            let verbose = false

                            if (node.isInline || noPaddingTypes.includes(node.type.name) || doc.resolve(pos).depth > 1) {
                                if (verbose) {
                                    console.log(title, "no padding for", node.type.name)
                                }

                                return
                            }

                            if (verbose) {
                                console.log(title, "padding for", node.type.name)
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