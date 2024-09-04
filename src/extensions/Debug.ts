import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { IMAGE, PRE } from '../config/nodes';

const noPaddingTypes = [PRE, IMAGE];

export const Debug = Extension.create({
    name: 'debug',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('debug'),
                props: {
                    handleClick: (view, event) => {
                        console.log("click");
                        const { state } = view;
                        const { from, to } = state.selection;
                        // const node = state.doc.nodeAt(from);
                        // console.log('clicked node is', node)
                        console.log('clicked pos is', from, to)
                        // console.log('clicked depth is', state.doc.resolve(from).depth)
                        // var pos = from;

                        // while (state.doc.resolve(pos).depth > 2) {
                        //     pos = pos - 1

                        //     console.log(pos)
                        // }

                        // console.log(pos)
                        // let target = state.doc.resolve(pos).parent
                        // console.log(target)

                        // var targetPos = pos
                        // var targetNode = state.doc.resolve(pos).parent
                        // state.doc.descendants((node, p) => {
                        //     if (p < pos && node.isLeaf == false) {
                        //         console.log('ok', node)
                        //         console.log(p)
                        //         targetPos = p
                        //         targetNode = node
                        //     }
                        // })

                        // console.log(targetNode)

                        // const transaction = state.tr.setNodeMarkup(targetPos, undefined, {
                        //     ...targetNode.attrs,
                        //     class: "bg-red-500",
                        //     style: 'background-color: red;',
                        // });

                        // console.log(transaction.docChanged)

                        // view.dispatch(transaction);

                        return true;
                    },
                },
            }),
        ];
    },
});