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
import bigDoc from '../../samples/big';
import { LogStoreStorage } from '../LogStore';
import LogViewer from './LogViewer.vue'
const props = defineProps({
    editor: {
        type: TiptapEditor,
        required: true
    }
})

const address = ref('')
const showTree = ref(false)
const showLogs = ref(false)
const nodeStoreStorage = props.editor.storage.nodeStore as NodeStoreStorage
const selectionStorage = props.editor.storage.selection as SmartSelectionStorage
const logStoreStorage = props.editor.storage.logStore as LogStoreStorage

props.editor.on('selectionUpdate', () => {
    address.value = selectionStorage.selectionTypes.join('->');
})

onMounted(() => {
    address.value = selectionStorage.selectionTypes.join('->');
})

function closeMessage() {
    props.editor.commands.disableDebugBar()
}

function toggleTree() {
    showTree.value = !showTree.value
}

function toggleLogsView() {
    showLogs.value = !showLogs.value
}

const editorNode = computed(() => nodeStoreStorage.article)
</script>

<template>
    <!-- LogViewer - Move it before the DebugBar div -->
    <LogViewer v-if="showLogs"
        class="fixed bottom-[3rem] left-0 right-0 h-[30vh] bg-white shadow-lg z-[90] overflow-auto"
        :logs="logStoreStorage.logs" @close="toggleLogsView" />

    <!-- DebugBar -->
    <div class="w-full h-12 px-4 bg-slate-800 text-gray-400 relative z-[100]">
        <div class="flex justify-between items-center h-full">
            <p>{{ address }}</p>

            <div class="card-actions justify-end flex gap-2 items-center h-full flex-row">
                <button class="btn btn-primary btn-sm" @click="editor.commands.toggleToc()">TOC</button>
                <button class="btn btn-primary btn-sm" @click="editor.commands.toggleReadOnly()">只读/编辑</button>
                <button class="btn btn-primary btn-sm" @click="editor.commands.toggleSourceCode()">源码</button>
                <button class="btn btn-primary btn-sm" @click="editor.commands.updateContent(codeBlockDoc)">代码块</button>
                <button class="btn btn-primary btn-sm" @click="editor.commands.setContentFeatures()">宣传图</button>
                <button class="btn btn-primary btn-sm" @click="editor.commands.updateContent(baseDoc)">混合</button>
                <button class="btn btn-primary btn-sm" @click="editor.commands.updateContent(miniDoc)">小型</button>
                <button class="btn btn-primary btn-sm" @click="editor.commands.updateContent(bigDoc)">大型</button>
                <button class="btn btn-primary btn-sm" @click="editor.commands.createArticle()">创建文章</button>
                <button class="btn btn-primary btn-sm" @click="editor.commands.updateContent(featureDoc)">功能</button>
                <button class="btn btn-primary btn-sm" @click="toggleLogsView">日志</button>
                <button class="btn btn-primary btn-sm" @click="toggleTree">结构</button>
                <button class="btn btn-primary btn-sm" @click="closeMessage">关闭</button>
            </div>
        </div>

        <!-- Tree View -->
        <div v-if="showTree"
            class="fixed bottom-[3rem] left-0 right-0 h-[30vh] bg-cyan-100/95 shadow-lg z-[90] overflow-auto">
            <div class="p-6">
                <Tree :node="editorNode" :is-root="true" @close="toggleTree" />
            </div>
        </div>
    </div>
</template>
