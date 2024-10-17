import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { ROOT, LIST_ITEM, BULLET_LIST, HEADING, A, TASKLIST, TASK_ITEM, TABLE_CELL, TABLE_HEADER, IMAGE } from '../config/nodes';
import SmartImage from './SmartImage/SmartImage';
import { getSelectionNode } from './SmartSelection';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        margin: {
            setMargin: (className: string) => ReturnType
        }
    }
}

const title = '👔 Margin'

export const Margin = Extension.create({
    name: 'margin',

    addOptions() {
        return {
            defaultMargin: '',
            marginConfig: {
                [BULLET_LIST]: 'ml-0',
                [TASKLIST]: 'ml-0',
                [HEADING]: '',
                [SmartImage.name]: 'ml-0',
            },
            excludeNodes: [
                ROOT,
                A,
            ],
            excludeClass: 'no-margin',
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

    addCommands() {
        return {
            setMargin: (className: string) => ({ commands }) => {
                let node = getSelectionNode(this.editor)
                console.log('node', node)
                console.log('className', className)
                console.log('node name', node.type.name)
                console.log(this.editor.isActive(node.type.name))
                return commands.updateAttributes(node.type.name, { class: className })
            }
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('margin'),
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

                            const marginClass = this.options.marginConfig[node.type.name] || this.options.defaultMargin

                            if (marginClass.trim() !== '') {
                                decorations.push(
                                    Decoration.node(pos, pos + node.nodeSize, {
                                        class: marginClass,
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
