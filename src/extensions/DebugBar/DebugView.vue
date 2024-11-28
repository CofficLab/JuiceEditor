<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { TiptapEditor } from '../../model/TiptapGroup';
import Tree from './Tree.vue';
import { NodeStoreStorage } from '../NodeStore';
import { SmartSelectionStorage } from '../SmartSelection';
import featureDoc from '../../samples/feature';
import codeBlockDoc from '../../samples/codeBlock';
import baseDoc from '../../samples/base';
import miniDoc from '../../samples/mini';

const props = defineProps({
    editor: {
        type: TiptapEditor,
        required: true
    }
})

const address = ref('')
const showTree = ref(false)
const nodeStoreStorage = props.editor.storage.nodeStore as NodeStoreStorage
const selectionStorage = props.editor.storage.selection as SmartSelectionStorage

props.editor.on('selectionUpdate', () => {
    address.value = selectionStorage.selectionTypes.join('->');
})

onMounted(() => {
    address.value = selectionStorage.selectionTypes.join('->');
})

function closeMessage() {
    props.editor.commands.toggleDebugBar()
}

function toggleTree() {
    showTree.value = !showTree.value
}

const editorNode = computed(() => nodeStoreStorage.article)
</script>

<template>
    <div class="w-full h-12 px-4 bg-slate-800 text-gray-400">
        <div class="flex justify-between items-center h-full">
            <p>{{ address }}</p>

            <div class="card-actions justify-end flex gap-2 items-center h-full flex-row">
                <button class="btn btn-primary btn-sm" @click="props.editor.commands.toggleToc()">TOC</button>
                <button class="btn btn-primary btn-sm" @click="props.editor.commands.toggleReadOnly()">只读/编辑</button>
                <button class="btn btn-primary btn-sm" @click="props.editor.commands.toggleSourceCode()">源码</button>
                <button class="btn btn-primary btn-sm"
                    @click="props.editor.commands.setContent(codeBlockDoc)">代码块</button>
                <button class="btn btn-primary btn-sm"
                    @click="props.editor.commands.setContent('<h1>宣传图</h1><features-component></features-component>')">宣传图</button>
                <button class="btn btn-primary btn-sm" @click="props.editor.commands.setContent(baseDoc)">混合</button>
                <button class="btn btn-primary btn-sm" @click="props.editor.commands.setContent(miniDoc)">小型</button>
                <button class="btn btn-primary btn-sm"
                    @click="props.editor.commands.createArticle('New Article')">创建文章</button>
                <button class="btn btn-primary btn-sm" @click="props.editor.commands.setContent(featureDoc)">功能</button>
                <button class="btn btn-primary btn-sm" @click="toggleTree">结构</button>
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
