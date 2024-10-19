import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { ROOT, LIST_ITEM, BULLET_LIST, HEADING, A, TASKLIST, TASK_ITEM, TABLE_CELL, TABLE_HEADER, IMAGE } from '../config/nodes';

const title = '👔 Padding'

export const Padding = Extension.create({
    name: 'padding',

    addOptions() {
        return {
            defaultPadding: 'px-8',
            paddingConfig: {
                [BULLET_LIST]: 'pl-12',
                [TASKLIST]: 'pl-12',
                [HEADING]: 'px-8',
            },
            excludeNodes: [
                ROOT,
                A,
                IMAGE,
            ],
            excludeClass: 'no-padding',
            excludeIfIn: [
                BULLET_LIST,
                LIST_ITEM,
                TASKLIST,
                TASK_ITEM,
                TABLE_CELL,
                TABLE_HEADER
            ],
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('padding'),
                props: {
                    decorations: ({ doc }) => {
                        const decorations: Decoration[] = []

                        doc.descendants((node, pos) => {
                            if (this.options.excludeNodes.includes(node.type.name)) {
                                return
                            }

                            const hasExcludeClass = node.attrs.class && node.attrs.class.includes(this.options.excludeClass)

                            if (hasExcludeClass) {
                                return
                            }

                            // 检查父节点是否在排除列表中
                            const parent = doc.resolve(pos).parent
                            if (this.options.excludeIfIn.includes(parent.type.name)) {
                                return
                            }

                            const paddingClass = this.options.paddingConfig[node.type.name] || this.options.defaultPadding

                            if (paddingClass.trim() !== '') {
                                decorations.push(
                                    Decoration.node(pos, pos + node.nodeSize, {
                                        class: paddingClass,
                                    }),
                                )
                            }
                        })

                        return DecorationSet.create(doc, decorations)
                    },
                },
            }),
        ];
    },
});
