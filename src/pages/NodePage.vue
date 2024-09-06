<script setup lang="ts">
import { useAppStore } from '../store/AppStore'
import { useFeatureStore } from '../store/FeatureStore'
import Loading from '../ui/Loading.vue'
import CoreEditor from '../core/CoreEditor.vue'
import TreeNode from '../model/TreeNode'
import Children from '../core/Children.vue'
import { onMounted, watch } from 'vue'
import PluginProvider from '../provider/PluginProvider'
import ListenerProvider from '../provider/ListenerProvider'
import ApiProvider from '../provider/ApiProvider'
import { useNodeStore } from '../store/NodeStore'
import { useDocsStore } from '../store/DocsStore'
import UUIDHelper from '../helper/UUIDHelper'
import PageMode from '../model/PageMode'
import { useModeStore } from '../store/ModeStore'
import { computed, ref } from 'vue';
import { useDocStore } from '../store/DocStore';
import EditorDoc from '../model/EditorDoc';
import Config from '../config/config'

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
    }
})

const title = '🐈 NodePage'
const docStore = useDocStore();
const nodeStore = useNodeStore();
const docsStore = useDocsStore();
const docs = computed(() => docsStore.getDocs());
const currentDoc = computed(() => docStore.getDoc());
const selected = ref(currentDoc.value?.uuid);
const pluginProvider = new PluginProvider(Config.plugins)
const feature = useFeatureStore()
const app = useAppStore()
const modeStore = useModeStore()
const children: TreeNode[] = []
const listenerProvider = new ListenerProvider(Config.listeners)
const apiProvider = new ApiProvider({
    featureProvider: feature,
    editorProvider: docStore,
    nodeProvider: nodeStore,
    docsProvider: docsStore,
    modeProvider: modeStore
})

docStore.drawLink = props.drawio
feature.editable = !props.readonly

onMounted(() => {
    app.setNotReady("NodePage onMounted")

    listenerProvider.boot(PageMode.BASIC)
    apiProvider.boot()

    app.setReady("NodePage onMounted")
})

const newDoc = () => {
    const doc = EditorDoc.default();
    docStore.setDoc(doc);
    selected.value = doc.uuid
}

watch(() => docStore.getDoc(), (newDoc) => {
    if (newDoc) {
        docsStore.upsertDoc(newDoc);
        selected.value = newDoc.uuid
    }

    pluginProvider.onDocUpdated(docStore.getDoc())
    pluginProvider.onDocUpdatedWithNode(docStore.getDoc(), nodeStore.getNode())
}, { deep: true })

watch(() => docsStore.docs, () => {
    pluginProvider.onDocsUpdated(docsStore.docs)
}, { deep: true })

watch(() => app.ready, () => {
    if (app.ready) {
        pluginProvider.onReady(PageMode.NODE)
    }
})

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
        <Loading v-if="app.loading"></Loading>

        <CoreEditor v-if="feature.editorVisible" :content="docStore.getHTML()" :editable="feature.editable"
            :tableEnable="feature.tableEnabled" :drawEnable="feature.drawEnabled" :drawLink="docStore.drawLink"
            :bubbleMenusEnable="feature.bubbleMenuVisible" :floatingMenusEnable="feature.floatingMenuVisible"
            :onUpdate="docStore.updateDoc" :onMessage="onMessage" :uuid="docStore.getUUID() ?? UUIDHelper.generate()" />

        <Children v-if="children.length > 0" :children="children"></Children>
        <div style="position: absolute; top: 0; right: 0;" class="mt-12 mr-24 z-50">
            <select v-model="selected" v-if="docs.length > 0">
                <option v-for="doc in docs" :key="doc.uuid" :value="doc.uuid" :selected="doc.uuid == currentDoc?.uuid">
                    {{
                        doc.title }}</option>
            </select>
            <button @click="newDoc()">新建</button>
        </div>
    </main>
</template>
