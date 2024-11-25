<script lang="ts" setup>
import { computed, ref } from 'vue';
import { TiptapEditor } from '../../model/TiptapGroup';

const props = defineProps({
    editor: {
        type: TiptapEditor,
        required: true
    }
})

const type = ref('')

props.editor.on('selectionUpdate', () => {
    const { selection } = props.editor.state;
    const { $from } = selection;

    // 构建从根节点到当前节点的路径
    let node = $from.node();
    let path = [];

    // 从当前节点向上遍历到文档根节点
    for (let depth = $from.depth; depth >= 0; depth--) {
        path.unshift(node.type.name);
        node = $from.node(depth);
    }

    // 用箭头连接所有节点类型
    type.value = path.join('->');
})

function closeMessage() {
    props.editor.commands.closeDebugBar()
}
</script>

<template>
    <div class="w-full h-12 px-4 bg-slate-800 text-gray-400">
        <div class="flex justify-between items-center">
            <p>{{ type }}</p>

            <div class="card-actions justify-end">
                <button class="btn btn-primary btn-sm" @click="closeMessage">关闭</button>
            </div>
        </div>
    </div>
</template>
