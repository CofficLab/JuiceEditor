import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { ROOT, PARAGRAPH, LIST_ITEM, UL, BULLET_LIST, HEADING, A, TASKLIST, TASK_ITEM, TABLE_CELL, TABLE_HEADER, IMAGE } from '../config/nodes';
import BulletList from 'src/buttons/BulletList.vue';
import Link from 'src/ui/Link.vue';

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
                            console.log(`Processing node: ${node.type.name}, attrs:`, node.attrs)

                            if (this.options.excludeNodes.includes(node.type.name)) {
                                console.log(`Excluded node: ${node.type.name}`)
                                return
                            }

                            const hasExcludeClass = node.attrs.class && node.attrs.class.includes(this.options.excludeClass)

                            if (hasExcludeClass) {
                                console.log(`Node has exclude class: ${node.type.name}`)
                                return
                            }

                            // 检查父节点是否在排除列表中
                            const parent = doc.resolve(pos).parent
                            if (this.options.excludeIfIn.includes(parent.type.name)) {
                                console.log(`Parent node ${parent.type.name} is in exclude list, skipping padding for ${node.type.name}`)
                                return
                            }

                            const paddingClass = this.options.paddingConfig[node.type.name] || this.options.defaultPadding

                            console.log(`Node: ${node.type.name}, Padding class: ${paddingClass}`)

                            if (paddingClass.trim() !== '') {
                                decorations.push(
                                    Decoration.node(pos, pos + node.nodeSize, {
                                        class: paddingClass,
                                    }),
                                )

                                const headingLevel = node.type.name === HEADING ? node.attrs.level : null;
                                console.log(`Padding applied to node: ${node.type.name}${headingLevel ? ` (level ${headingLevel})` : ''}, class: ${paddingClass}`)
                            } else {
                                console.log(`Padding not applied to node: ${node.type.name}, paddingClass is empty`)
                            }
                        })

                        return DecorationSet.create(doc, decorations)
                    },
                },
            }),
        ];
    },
});
