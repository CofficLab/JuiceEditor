import TiptapExtension from '../model/TiptapExtension';
import { Plugin, PluginKey } from 'prosemirror-state';

export const Debug = TiptapExtension.create({
    name: 'debug',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('debug'),
                props: {
                    handleClick: (view) => {
                        var enableDebug = false;

                        if (process.env.NODE_ENV == 'development' && enableDebug) {
                            const { state } = view;
                            const { from, to } = state.selection;
                            const node = state.doc.nodeAt(from);
                            console.log('clicked node is', node)
                            console.log('clicked node type is', node?.type.name)
                            console.log('clicked pos is', from, to)

                            // 获取并输出父节点类型
                            const $from = state.selection.$from;
                            const parentNode = $from.parent;
                            console.log('parent node type is', parentNode.type.name);
                        }
                    },
                },
            }),
        ];
    },
});
