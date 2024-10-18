import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { ROOT, LIST_ITEM, BULLET_LIST, HEADING, A, TASKLIST, TASK_ITEM, TABLE_CELL, TABLE_HEADER, IMAGE } from '../config/nodes';
import SmartImage from './SmartImage/SmartImage';
import { getSelectionNode } from './SmartSelection';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        margin: {
            moveRight: () => ReturnType,
            moveCenter: () => ReturnType,
            moveLeft: () => ReturnType,
        }
    }
}

const title = '👔 Margin'

export const Margin = Extension.create({
    name: 'margin',

    addOptions() {
        return {
            defaultMargin: '',
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
            levels: [
                'ml-0',
                'ml-2',
                'ml-4',
                'ml-6',
                'ml-8',
                'ml-10',
                'ml-12',
                'ml-14',
                'ml-16',
                'ml-20',
                'ml-24',
                'ml-28',
                'ml-32',
                'ml-36',
                'ml-40',
                'ml-44',
                'ml-48',
                'ml-52',
                'ml-56',
                'ml-60',
                'ml-64',
                'ml-72',
                'ml-80',
                'ml-96',
            ] as const,
        }
    },

    addCommands() {
        return {
            moveRight: () => ({ commands }) => {
                let node = getSelectionNode(this.editor);
                let attrs = { ...node.attrs };
                let currentIndex = -1;

                if (attrs.class == null) {
                    console.log('no class attrs', attrs)
                    return false
                }

                // 找出当前的 level 索引
                this.options.levels.forEach((cls: string, index: number) => {
                    if (attrs.class.includes(cls)) {
                        currentIndex = index;
                    }
                });

                // 删除原有的 margin class
                this.options.levels.forEach((cls: string) => {
                    attrs.class = attrs.class.replace(cls, '').trim();
                });

                // 设置下一个 level，如果已经是最大的索引就设置为第一个
                const nextIndex = currentIndex + 1 < this.options.levels.length
                    ? currentIndex + 1
                    : 0;

                attrs.class += ' ' + this.options.levels[nextIndex];
                return commands.updateAttributes(node.type.name, attrs);
            },
            moveLeft: () => ({ commands }) => {
                let node = getSelectionNode(this.editor);
                let attrs = { ...node.attrs };
                let currentIndex = -1;

                if (attrs.class == null) {
                    console.log('node type', node.type.name)
                    console.log('no class attrs', attrs)
                    return false
                }

                // 找出当前的 level 索引
                this.options.levels.forEach((cls: string, index: number) => {
                    if (attrs.class.includes(cls)) {
                        currentIndex = index;
                    }
                });

                // 删除原有的 margin class
                this.options.levels.forEach((cls: string) => {
                    attrs.class = attrs.class.replace(cls, '').trim();
                });

                // 设置下一个 level，如果已经是最大的索引就设置为第一个
                const nextIndex = currentIndex - 1 >= 0
                    ? currentIndex - 1
                    : this.options.levels.length - 1;

                attrs.class += ' ' + this.options.levels[nextIndex];
                return commands.updateAttributes(node.type.name, attrs);
            },
            moveCenter: () => ({ commands }) => {
                let node = getSelectionNode(this.editor);
                let attrs = { ...node.attrs };

                // 删除所有 margin 相关的 class
                this.options.levels.forEach((cls: string) => {
                    attrs.class = attrs.class.replace(cls, '').trim();
                });

                // 添加 mx-auto 类
                attrs.class += ' mx-auto';

                return commands.updateAttributes(node.type.name, attrs);
            },
        }
    },
});
