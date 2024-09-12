<script setup lang="ts">
import { useAppStore } from '../store/AppStore'
import { useFeatureStore } from '../store/FeatureStore'
import CoreEditor from '../core/CoreEditor.vue'
import TreeNode from '../model/TreeNode'
import Children from '../core/Children.vue'
import { onMounted, watch } from 'vue'
import PluginProvider from '../provider/PluginProvider'
import { useNodeStore } from '../store/NodeStore'
import { useDocsStore } from '../store/DocsStore'
import { computed, ref } from 'vue';
import { useDocStore } from '../store/DocStore';
import EditorDoc from '../model/EditorDoc';
const props = defineProps({
    drawio: {
        type: String,
        required: true
    },
    readonly: {
        type: Boolean,
        default: false
    },
    onMessage: {
        type: Function,
        required: true
    },
    pluginProvider: {
        type: PluginProvider,
        required: true
    }
})

const title = '🐈 NodePage'
const docStore = useDocStore();
const nodeStore = useNodeStore();
const docsStore = useDocsStore();
const docs = computed(() => docsStore.getDocs());
const currentDoc = computed(() => docStore.getDoc());
const selected = ref(currentDoc.value?.getUUID());
const feature = useFeatureStore()
const app = useAppStore()
const children: TreeNode[] = []
const pluginProvider = props.pluginProvider

docStore.drawLink = props.drawio
feature.editable = !props.readonly

onMounted(() => {
    app.setReady("NodePage onMounted")
})

const newDoc = () => {
    const doc = EditorDoc.default();
    docStore.setDoc(doc);
    selected.value = doc.getUUID()
}

watch(() => docStore.getDoc(), (newDoc) => {
    if (newDoc) {
        docsStore.upsertDoc(newDoc);
        selected.value = newDoc.getUUID()
    }

    pluginProvider.onDocUpdatedWithNode(docStore.getDoc(), nodeStore.getNode())
}, { deep: true })

watch(() => docsStore.docs, () => {
    pluginProvider.onDocsUpdated(docsStore.docs)
}, { deep: true })


watch(selected, (newSelected) => {
    let verbose = false
    if (verbose) {
        console.log(title, 'selected changed', newSelected)
    }

    if (newSelected) {
        const doc = docsStore.getDoc(newSelected);
        if (doc) {
            docStore.setDoc(doc);
        }

        pluginProvider.onCurrentDocUUIDUpdated(newSelected)
    }
})

</script>

<template>
    <main class="main">
        <div v-if="currentDoc" class="w-full">
            <CoreEditor :content="docStore.getHTML()" :editable="feature.editable" :tableEnable="feature.tableEnabled"
                :drawEnable="feature.drawEnabled" :drawLink="docStore.drawLink"
                :bubbleMenusEnable="feature.bubbleMenuVisible" :floatingMenusEnable="feature.floatingMenuVisible"
                :onUpdate="docStore.updateDoc" :onMessage="onMessage" :uuid="currentDoc.getDocUUID()" />

            <div style="position: absolute; top: 0; right: 0;" class="mt-12 mr-24 z-50">
                <select v-model="selected" v-if="docs.length > 0">
                    <option v-for="doc in docs" :key="doc.getUUID()" :value="doc.getUUID()"
                        :selected="doc.getUUID() == currentDoc?.getUUID()">
                        {{
                            doc.title }}</option>
                </select>
                <button @click="newDoc()">新建</button>
            </div>
        </div>

        <Children v-if="children.length > 0" :children="children"></Children>
    </main>
</template>
