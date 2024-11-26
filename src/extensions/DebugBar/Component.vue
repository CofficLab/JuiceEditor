<script lang="ts" setup>
import { computed, ref } from 'vue';
import { TiptapEditor } from '../../model/TiptapGroup';
import Tree from './Tree.vue';
import { NodeStoreStorage } from '../../extensions/NodeStore';

const props = defineProps({
    editor: {
        type: TiptapEditor,
        required: true
    }
})

const type = ref('')
const showTree = ref(false)
const nodeStoreStorage = props.editor.storage.nodeStore as NodeStoreStorage

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

function toggleTree() {
    showTree.value = !showTree.value
}

const editorNode = computed(() => nodeStoreStorage.article)
</script>

<template>
    <div class="w-full h-12 px-4 bg-slate-800 text-gray-400">
        <div class="flex justify-between items-center h-full">
            <p>{{ type }}</p>

            <div class="card-actions justify-end flex gap-2 items-center h-full flex-row">
                <button class="btn btn-primary btn-sm" @click="toggleTree">查看结构</button>
                <button class="btn btn-primary btn-sm" @click="closeMessage">关闭</button>
            </div>
        </div>

        <!-- Tree Modal -->
        <div v-if="showTree"
            class="fixed bottom-24 inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center -translate-y-96">
            <div
                class="bg-indigo-100/95 rounded-lg p-6 pb-24 w-[90%] max-w-3xl max-h-[75vh] overflow-auto  -translate-y-44">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-gray-900">节点结构</h3>
                    <button class="text-gray-500 hover:text-gray-700" @click="toggleTree">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="pb-2">
                    <Tree :nodes="[editorNode]" />
                </div>
            </div>
        </div>
    </div>
</template>
