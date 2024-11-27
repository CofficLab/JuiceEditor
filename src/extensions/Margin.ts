import { TiptapExtension } from '../model/TiptapGroup';
import { getSelectionNode } from './SmartSelection';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Features from './Features/Features';
import Article from './Article';

export interface MarginStorage {
    title: string,
    levels: readonly string[],
}

export interface MarginOptions {
    defaultMargin: string,
    excludeNodes: string[],
    excludeClass: string,
    excludeIfIn: string[],
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        margin: {
            moveRight: () => ReturnType,
            justifyCenter: () => ReturnType,
            moveLeft: () => ReturnType,
            justifyStart: () => ReturnType,
            justifyEnd: () => ReturnType,
            resetMargin: () => ReturnType,
        }
    }
}

const Margin = TiptapExtension.create<MarginOptions, MarginStorage>({
    name: 'margin',

    addStorage() {
        return {
            title: '👔 Margin',
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

    addOptions() {
        return {
            defaultMargin: '',
            excludeNodes: [
                Link.name,
                Article.name,
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
            ]
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
                this.storage.levels.forEach((cls: string, index: number) => {
                    if (attrs.class.includes(cls)) {
                        currentIndex = index;
                    }
                });

                // 删除所有 margin 相关的 class
                this.storage.levels.forEach((cls: string) => {
                    attrs.class = attrs.class.replaceAll(cls, '').trim();
                });

                attrs.class = attrs.class.replaceAll('mx-auto', '').trim();
                attrs.class = attrs.class.replaceAll('ml-0', '').trim();
                attrs.class = attrs.class.replaceAll('mr-0', '').trim();

                // 如果已经是最大索引,则不做任何操作
                if (currentIndex + 1 >= this.storage.levels.length) {
                    return false;
                }

                const nextIndex = currentIndex + 1;
                attrs.class += ' ' + this.storage.levels[nextIndex];
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
                this.storage.levels.forEach((cls: string, index: number) => {
                    if (attrs.class.includes(cls)) {
                        currentIndex = index;
                    }
                });

                // 删除所有 margin 相关的 class
                this.storage.levels.forEach((cls: string) => {
                    attrs.class = attrs.class.replaceAll(cls, '').trim();
                });

                attrs.class = attrs.class.replaceAll('mx-auto', '').trim();
                attrs.class = attrs.class.replaceAll('ml-0', '').trim();
                attrs.class = attrs.class.replaceAll('mr-0', '').trim();

                // 如果已经是最小索引,则不做任何操作
                if (currentIndex - 1 < 0) {
                    return false;
                }

                const nextIndex = currentIndex - 1;
                attrs.class += ' ' + this.storage.levels[nextIndex];
                return commands.updateAttributes(node.type.name, attrs);
            },

            justifyCenter: () => ({ commands }) => {
                let node = getSelectionNode(this.editor);
                let attrs = { ...node.attrs };

                // 删除所有 margin 相关的 class
                this.storage.levels.forEach((cls: string) => {
                    attrs.class = attrs.class.replaceAll(cls, '').trim();
                });

                attrs.class = attrs.class.replaceAll('mx-auto', '').trim();
                attrs.class = attrs.class.replaceAll('ml-0', '').trim();
                attrs.class = attrs.class.replaceAll('mr-0', '').trim();

                // 添加 mx-auto 类
                attrs.class += ' mx-auto';

                return commands.updateAttributes(node.type.name, attrs);
            },

            justifyStart: () => ({ commands }) => {
                let node = getSelectionNode(this.editor);
                let attrs = { ...node.attrs };

                // 删除所有 margin 相关的 class
                this.storage.levels.forEach((cls: string) => {
                    attrs.class = attrs.class.replaceAll(cls, '').trim();
                });

                attrs.class = attrs.class.replaceAll('mx-auto', '').trim();
                attrs.class = attrs.class.replaceAll('ml-0', '').trim();
                attrs.class = attrs.class.replaceAll('mr-0', '').trim();

                attrs.class += ' mx-auto ml-0';

                return commands.updateAttributes(node.type.name, attrs);
            },

            justifyEnd: () => ({ commands }) => {
                let node = getSelectionNode(this.editor);
                let attrs = { ...node.attrs };

                // 删除所有 margin 相关的 class
                this.storage.levels.forEach((cls: string) => {
                    attrs.class = attrs.class.replaceAll(cls, '').trim();
                });

                attrs.class = attrs.class.replaceAll('mx-auto', '').trim();
                attrs.class = attrs.class.replaceAll('ml-0', '').trim();
                attrs.class = attrs.class.replaceAll('mr-0', '').trim();

                // 添加新的 class
                attrs.class += ' mx-auto mr-0';
                return commands.updateAttributes(node.type.name, attrs);
            },

            resetMargin: () => ({ commands }) => {
                let node = getSelectionNode(this.editor);
                let attrs = { ...node.attrs };

                // 删除所有 margin 相关的 class
                this.storage.levels.forEach((cls: string) => {
                    attrs.class = attrs.class.replaceAll(cls, '').trim();
                });

                attrs.class = attrs.class.replaceAll('mx-auto', '').trim();
                attrs.class = attrs.class.replaceAll('ml-0', '').trim();
                attrs.class = attrs.class.replaceAll('mr-0', '').trim();

                return commands.updateAttributes(node.type.name, attrs);
            },
        }
    },
});

export default Margin