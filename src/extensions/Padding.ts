import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { ROOT, PARAGRAPH, LIST_ITEM, UL, BULLET_LIST, HEADING } from '../config/nodes';

const title = '👔 Padding'

export const Padding = Extension.create({
    name: 'padding',

    addOptions() {
        return {
            defaultPadding: 'px-8',
            paddingConfig: {
                [ROOT]: '',
                [UL]: 'pl-12',
                [BULLET_LIST]: 'pl-12',
                // 可以在这里添加更多节点类型的配置
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('padding'),
                props: {
                    decorations: ({ doc }) => {
                        const decorations: Decoration[] = []
                        let parentHasPadding = false

                        doc.descendants((node, pos) => {
                            let paddingClass = this.options.paddingConfig[node.type.name] || this.options.defaultPadding

                            if (paddingClass.trim() !== '' && !parentHasPadding) {
                                decorations.push(
                                    Decoration.node(pos, pos + node.nodeSize, {
                                        class: paddingClass,
                                    }),
                                )
                                parentHasPadding = true
                            } else if (paddingClass.trim() === '') {
                                parentHasPadding = false
                            }

                            return parentHasPadding
                        })

                        return DecorationSet.create(doc, decorations)
                    },
                },
            }),
        ];
    },
});
