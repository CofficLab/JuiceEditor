import { Extension, Editor } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { Root } from './Root/Root';
import DomHelper from '../helper/DomHelper';

interface SmartActiveOptions {
    className: string
    firstClassName: string
}

export const SmartActive = Extension.create<SmartActiveOptions>({
    name: 'active',

    addOptions() {
        return {
            className: 'has-active',
            firstClassName: 'first-active',
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('active'),
                props: {
                    decorations: ({ doc, selection }) => {
                        let isFirst = true;
                        const decorations: Decoration[] = []
                        const { from, to } = selection

                        doc.nodesBetween(from, to, (node, pos) => {
                            if (this.editor.isActive(node.type.name) && node.type.name != Root.name) {
                                decorations.push(
                                    Decoration.node(pos, pos + node.nodeSize, {
                                        class: this.options.className,
                                    })
                                )

                                if (isFirst) {
                                    decorations.push(
                                        Decoration.node(pos, pos + node.nodeSize, {
                                            class: this.options.firstClassName,
                                        })
                                    )

                                    isFirst = false;
                                }
                            }
                        })

                        return DecorationSet.create(doc, decorations)
                    },
                },
            }),
        ]
    },
});

export const getFirstActiveNodePosition = (editor: Editor): { offsetTop: number | null, offsetLeft: number | null } => {
    const focusClassName = editor.extensionManager.extensions.find(extension => extension.name === SmartActive.name)?.options.className
    const currentNode: Element | null = DomHelper.querySelector(`.` + focusClassName)

    if (currentNode === null) {
        return { offsetTop: null, offsetLeft: null }
    }

    // 当前元素距离页面顶部的距离
    let { offsetTop, offsetLeft } = currentNode as HTMLElement

    // 微修正菜单位置
    offsetTop = currentNode.tagName === 'DIV' ? offsetTop - 8 : offsetTop - 5
    let offsetY = 0
    if (editor.isActive('horizontalRule') || editor.isActive('table')) {
        offsetY = 5
    }
    if (editor.isActive('pagination')) {
        offsetY = -4
    }
    return { offsetTop, offsetLeft }
}