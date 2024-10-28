import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { BulletList } from '@tiptap/extension-bullet-list'
import { TaskList } from '@tiptap/extension-task-list'
import Heading from '@tiptap/extension-heading'
import { Document } from '@tiptap/extension-document'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { ListItem } from '@tiptap/extension-list-item'
import { TaskItem } from '@tiptap/extension-task-item'
import { Root } from './Root';
import CodeBlock from '@tiptap/extension-code-block';
import Features from './Features/Features';
const title = '👔 Padding'

export const Padding = Extension.create({
    name: 'padding',

    addOptions() {
        return {
            defaultPadding: 'px-8',
            paddingConfig: {
                [BulletList.name]: 'pl-12',
                [TaskList.name]: 'pl-12',
                [Heading.name]: 'px-8',
            },
            excludeNodes: [
                Root.name,
                Link.name,
                Image.name,
                CodeBlock.name,
                Features.name,
            ],
            excludeClass: 'no-padding',
            excludeIfIn: [
                BulletList.name,
                ListItem.name,
                TaskList.name,
                TaskItem.name,
                TableCell.name,
                TableHeader.name
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
