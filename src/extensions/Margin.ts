import { Extension } from '@tiptap/core';
import { getSelectionNode } from './SmartSelection';
import { Root } from './Root';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Features from './Features/Features';

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
                Root.name,
                Link.name,
            ],
            excludeClass: 'no-margin',
            excludeIfIn: [
                BulletList.name,
                ListItem.name,
                TaskList.name,
                TaskItem.name,
                TableCell.name,
                TableHeader.name,
                Features.name,
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

                // 如果已经是最大索引,则不做任何操作
                if (currentIndex + 1 >= this.options.levels.length) {
                    return false;
                }

                const nextIndex = currentIndex + 1;
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

                // 如果已经是最小索引,则不做任何操作
                if (currentIndex - 1 < 0) {
                    return false;
                }

                const nextIndex = currentIndex - 1;
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
